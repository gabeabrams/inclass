const { MongoClient } = require('mongodb');

const DB_NAME = 'inclass';
const COLLECTION_NAME = 'logs';
const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// Get MONGO_LOGS url from environment
const url = process.env.MONGO_LOGS;
let LOGGING_OFF;
if (!url) {
  // eslint-disable-next-line no-console
  console.log('No MONGO_LOGS environment variable could be found. Logging has been turned off.');
  LOGGING_OFF = true;
}

// Set up a connection
let getCollection;
if (!LOGGING_OFF) {
  getCollection = new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, client) => {
        if (err) {
          return reject(err);
        }

        // Connected successfully to logs database

        // Now, get the specific database
        return resolve(
          client
            .db(DB_NAME)
            .collection(COLLECTION_NAME)
        );
      }
    );
  });
}

/**
 * Sends an object to the log database
 * @param {object} fullData - the data to write
 */
const sendToCollection = async (data) => {
  const collection = await getCollection;

  return new Promise((resolve, reject) => {
    collection.insertOne(data, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

/**
 * Writes a log to the log database
 * @param {string} type - the log type
 * @param {object} data - the data for the log message
 * @param {object} req - the express request object associated with the request
 */
const writeLog = (opts) => {
  // Don't log if logging is turned off
  if (LOGGING_OFF) {
    return;
  }

  // Deconstruct options
  const {
    type,
    req,
  } = opts;
  const data = opts.data || {};

  // Don't log if user didn't launch
  if (
    !req
    || !req.session
    || !req.session.launched
    || !req.session.authorized
    || !req.session.canvasHost
    || !req.session.launchInfo
    || !req.session.catalogId
  ) {
    // eslint-disable-next-line no-console
    console.log('Could not log becuase session info is not complete.');
    console.log(req.session);
    return;
  }

  // Don't log if we don't have user information
  if (
    !req.session.launchInfo.courseId
    || !req.session.launchInfo.userId
    || !req.session.launchInfo.userFirstName
    || !req.session.launchInfo.userLastName
    || !req.session.launchInfo.userEmail
  ) {
    // eslint-disable-next-line no-console
    console.log('Could not log becuase launch info is not complete.');
    return;
  }

  // Add more data
  const now = new Date();
  const fullData = {
    // Log data
    data,
    // Type
    type,
    // Timing
    ms: now.getTime(),
    day: now.getDate(),
    dayOfWeek: DAYS_OF_WEEK[now.getDay()],
    month: now.getMonth() + 1,
    year: now.getYear() + 1900,
    timestamp: now.toISOString(),
    // Canvas info
    canvasHost: req.session.canvasHost,
    // Store launch info
    catalogId: req.session.catalogId,
    courseId: req.session.launchInfo.courseId,
    // User info
    userFirstName: req.session.launchInfo.userFirstName,
    userLastName: req.session.launchInfo.userLastName,
    userId: req.session.launchInfo.userId,
    userEmail: req.session.launchInfo.userEmail,
  };

  // Write to database
  sendToCollection(fullData)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(`An error occurred while trying to write a log to the mongo db: ${err.message}. Log payload: ${JSON.stringify(fullData)}`);
    });
};

module.exports = writeLog;
