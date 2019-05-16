const readJSON = require('./readJSON');

/**
 * Loads an app, merging with parentApp if applicable. If the app has a parent
 *   but one isn't included, throws an error. If the app cannot be read, throws
 *   an error.
 * @module server/Store/helpers/loadApp
 * @param {object} opts - all arguments in one object
 * @param {string} opts.catalogId - id of the catalog holding the app
 * @param {string} opts.appId - id of the app to load
 * @param {App} [opts.parentApp] - parent app (if this app has one)
 * @return {App} app metadata
 */
module.exports = (opts = {}) => {
  const {
    catalogMetadata,
    catalogId,
    appId,
    parentApp,
  } = opts;
  
  // TODO: for tags, if the value is not an array, turn it into one
  // TODO: resolve filepaths (use parent's filepath for screenshots if needed). Add app.screenshots[i].fullPath
  // TODO: use defaultSupportEmail from catalog metadata if no supportEmail is included
  // TODO: call serveScreenshots

  return {};
};
