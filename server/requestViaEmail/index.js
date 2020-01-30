// Import gmail lib
const prepareEmail = require('gmail-send');

// Import mutex
const Mutex = require('./Mutex');

// Constants
const MAX_CONCURRENT_EMAILS = 5;
const DEQUEUE_INTERVAL_MS = 100;

// Queue and variables for keeping track
let numEmailsInFlight = 0;
const queues = {};
/* ^ requestEmail => {
      timestamp,
      requestEmail,
      promise,
      resolve,
      reject,
      requests[],
    }
  */
const mutex = new Mutex();

/**
 * Call to dequeue an email and send it
 */
const sendEmail = async () => {
  if (numEmailsInFlight >= MAX_CONCURRENT_EMAILS) {
    return;
  }

  // Lock
  await mutex.lock();

  // Get queue items
  const queueItems = Object.values(queues);
  if (queueItems.length === 0) {
    mutex.unlock();
    return;
  }

  // Increment number of inflight emails
  if (numEmailsInFlight >= MAX_CONCURRENT_EMAILS) {
    mutex.unlock();
    return;
  }
  numEmailsInFlight += 1;

  let reject;
  try {
    // Sort queue items (oldest first)
    queueItems.sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return -1;
      }
      if (a.timestamp > b.timestamp) {
        return 1;
      }
      return 0;
    });

    // Dequeue
    const {
      resolve,
      requests,
      requestEmail,
    } = queueItems[0];
    (reject = queueItems[0]);
    delete queueItems[requestEmail];

    // Build the subject
    let subject = `[App Store] ${requests.length} Install/Uninstall Requests`;
    if (requests.length === 1) {
      const {
        appName,
        uninstalling,
      } = requests[0];
      subject = `[App Store] Request to ${uninstalling ? 'Uninstall' : 'Install'} "${appName}"`;
    }

    // Build the body
    const bodyCards = (
      requests
        .map((request) => {
          const {
            uninstalling,
            appName,
            requestorName,
            requestorId,
            courseName,
            courseId,
            requestorEmail,
            canvasHost,
          } = request;

          return `
  <div style="margin-top: 20px; border-radius: 5px; border: 1px solid gray; background-color: #d2f1ff; padding: 10px;">
    <div style="font-weight: bold;">
      Request to ${uninstalling ? 'Uninstall' : 'Install'} ${appName}
    </div>
    <div>
      Requested by: <em>${requestorName}</em>
    </div>
    <div>
      Course: <em>${courseName}</em>
    </div>
    <div style="margin-top: 15px;">
      <a
        style="text-decoration: none; color: white; font-weight: bold; border: 1px solid black; background: #0096ff; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; border-radius: 5px; margin-right: 5px;"
        aria-label="open an email to the requestor of this request"
        title="Open an email to the requestor of this request"
        href="https://${canvasHost}/courses/${courseId}"
      >
        Visit Course
      </a>
      <a
        style="text-decoration: none; color: black; font-weight: bold; border: 1px solid black; background: #ccc; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; border-radius: 5px; margin-right: 5px;"
        aria-label="open an email to the requestor of this request"
        href="mailto:${requestorEmail}?subject=Re: Your Request to Install ${appName}"
      >
        Reply via Email
      </a>
      <a
        style="text-decoration: none; color: black; font-weight: bold; border: 1px solid black; background: #ccc; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; border-radius: 5px;"
        aria-label="open a Canvas message to the requestor of this request"
        title="Open a Canvas message to the requestor of this request"
        href="https://${canvasHost}/conversations?context_id=${courseId}&user_id=${requestorId}&user_name=${encodeURIComponent(requestorName)}"
        target="_blank"
      >
        Reply via Canvas
      </a>
    </div>
  </div>
          `;
        })
        .join('\n')
    );

    const html = `
<div style="max-width: 800px; margin: auto; font-family: Arial;">
  <h2 style="text-align: center; margin-bottom: 10px;">
    ${requests.length} new Request${requests.length === 1 ? '' : 's'}
  </h2>

  ${bodyCards}


  <div style="text-align: left; font-weight: bold; margin-top: 20px;">
    Instructions:
  </div>

  <div style="text-align: left; margin-top: 5px;">
    To <em>deny</em> a request, reply and explain.
  </div>

  <div style="text-align: left; margin-top: 5px;">
    To <em>approve</em> a request, a Canvas admin can visit the course, open the app store, and do the install or uninstall on behalf of the user. Remember to reply and explain next steps.
  </div>

</div>`;

    // Unlock before sending
    mutex.unlock();

    // Send the email
    // TODO: make the client call this code
    const send = prepareEmail({
      user: 'inclassnotifications@gmail.com', // TODO: use actual value
      pass: 'PUTPASSHERE', // TODO: use actual value
      to: 'gabeabrams@gmail.com', // TODO: use actual value
      from: 'InClass Notifications <inclassnotifications@gmail.com>', // TODO: use actual value
      subject,
      html,
    });
    await send();

    // Resolve
    resolve();
  } catch (err) {
    reject();
  } finally {
    // Decrement the number of inflight emails
    numEmailsInFlight -= 1;
    mutex.unlock();
  }

  // Send another email
  sendEmail();
};

// Routinely check to send emails
setInterval(sendEmail, DEQUEUE_INTERVAL_MS);

/**
 * Add a request to the queue and return a promise that resolves when the
 *   request has been sent
 * @param {string} requestEmail - the email to send the request to
 * @param {number} requestorId - the Canvas id of the person sending the request
 * @param {string} requestorEmail - the email of the person sending the request
 * @param {string} requestorName - the name of the person sending the request
 * @param {number} courseId - the id of the course corresponding to the request
 * @param {string} courseName - the name of the course
 * @param {string} appName - the name of the app being requested
 * @param {string} appId - the id of the app being requested
 * @param {boolean} uninstalling - true if the user is requesting an uninstall
 * @param {string} canvasHost - the hostname of the Canvas instance
 * @return {Promise} promise that resolves to the html response to send to the
 *   client
 */
const addToQueue = async (opts) => {
  const { requestEmail } = opts;

  // Wait to lock the mutex
  await mutex.lock();

  let emailHasBeenSentPromise;
  try {
    // Create a queue if there isn't already one
    if (!queues[requestEmail]) {
      let promise;
      let resolve;
      let reject;

      // Wait until we have a promise and a resolve function
      await new Promise((r) => {
        promise = new Promise((resolveFunction, rejectFunction) => {
          // Save the resolve and reject functions
          resolve = resolveFunction;
          reject = rejectFunction;

          // Continue
          return r();
        });
      });

      queues[requestEmail] = {
        promise,
        resolve,
        reject,
        requestEmail,
        requests: [],
        timestamp: Date.now(),
      };
    }

    // Add to the queue
    queues[requestEmail].requests.push(opts);

    // Get promise to wait for
    emailHasBeenSentPromise = queues[requestEmail].promise;

    // Immediately attempt to send the email
    sendEmail();
  } catch (err) {
    return Promise.resolve({
      success: false,
      message: 'An error occurred while trying to send your request. Please contact an admin.',
    });
  } finally {
    // Unlock
    mutex.unlock();

    if (emailHasBeenSentPromise) {
      // Wait until the queued requests have been sent, resolve with a success
      await emailHasBeenSentPromise
        .then(() => {
          return {
            success: true,
          };
        })
        .catch(() => {
          return {
            success: false,
            message: 'An error occurred while waiting to send your request. Please contact an admin.',
          };
        });
    }
  }
};

module.exports = addToQueue;
