const readJSON = require('./readJSON');

/**
 * Loads an app, merging with parentApp if applicable. If the app has a parent
 *   but one isn't included, throws an error. If the app cannot be read, throws
 *   an error.
 * @module server/Store/helpers/loadApp
 * @param {string} catalogId - id of the catalog holding the app
 * @param {string} appId - id of the app to load
 * @param {object} [parentApp] - parent app (if this app has one)
 * @return {object} app metadata
 */
module.exports = (catalogId, appId, parentApp = {}) => {
  // TODO: implement
  // TODO: for tags, if the value is not an array, turn it into one

  return {};
};
