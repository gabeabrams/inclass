// Import mutex
const Mutex = require('./Mutex');

// Constants
const MAX_CONCURRENT_EMAILS = 5;
const DEQUEUE_INTERVAL_MS = 100;

// Queue and variables for keeping track
let numEmailsInFlight = 0;
const queues = {}; // requestEmail => { promise, resolve, requests[] }
const mutex = new Mutex();

/**
 * Call to dequeue an email and send it
 */
const sendEmail = async () => {
  // Lock
  await mutex.lock();

  try {

  }

  // Unlock
};

/**
 * Add a request to the queue and return a promise that resolves when the
 *   request has been sent
 * @param {string} requestEmail - the email to send the request to
 * @param {string} requestorEmail - the email of the person sending the request
 * @param {string} requestorName - the name of the person sending the request
 * @param {number} courseId - the id of the course corresponding to the request
 * @param {boolean} uninstalling - true if the user is requesting an uninstall
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

      // Wait until we have a promise and a resolve function
      await new Promise((r) => {
        promise = new Promise((resolveFunction) => {
          // Save the resolve function
          resolve = resolveFunction;

          // Continue
          return r();
        });
      });

      queues[requestEmail] = {
        promise,
        resolve,
        requests: [],
      };
    }

    // Add to the queue
    queues[requestEmail].requests.push(opts);

    // Get promise to wait for
    emailHasBeenSentPromise = queues[requestEmail].promise;
  } catch (err) {
    return Promise.resolve({
      success: false,
      message: 'An error occurred while trying to send your request. Please contact an admin.',
    });
  } finally {
    // Unlock
    mutex.unlock();

    // Wait until the queued requests have been sent then resolve with a success
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
};
