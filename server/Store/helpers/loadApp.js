const path = require('path');
const clone = require('fast-clone');
// this is used for cloning the parent

const STORE_PATH = require('../STORE_PATH');

const readJSON = require('./readJSON');

/**
 * Loads an app, merging with parentApp if applicable. If the app has a parent
 *   but one isn't included, throws an error. If the app cannot be read, throws
 *   an error.
 * @module server/Store/helpers/loadApp
 * @param {object} opts - all arguments in one object
 * @param {string} opts.catalogId - id of the catalog holding the app
 * @param {Catalog} opts.catalogMetadata - the catalog metadata information for
 *   the catalog containing the app that we need to load
 * @param {string} opts.appId - id of the app to load
 * @param {App} [opts.parentAppMetadata] - metadata for the parent app (if this
 *   app has one)
 * @return {App} app metadata
 */
module.exports = async (opts = {}) => {
  const {
    catalogId,
    catalogMetadata,
    appId,
    parentAppMetadata,
  } = opts;

  // load app metadata
  const appPath = path.join(STORE_PATH, catalogId, appId, 'metadata');
  const appMetadata = await readJSON(appPath);

  // process metadata information
  // for tags, if the value is not an array, turn it into one
  if (appMetadata.tags) {
    Object.keys(appMetadata.tags).forEach((tagName) => {
      // check if they have tags
      let tagValue = appMetadata.tags[tagName];
      if (!Array.isArray(tagValue)) {
        tagValue = [tagValue];
        appMetadata.tags[tagName] = tagValue;
      }
    });
  }
  // add png to screenshot path if it doesn't end with screenshot
  if (appMetadata.screenshots) {
    for (let i = 0; i < appMetadata.screenshots.length; i++) {
      const file = appMetadata.screenshots[i].filename;
      const completeFilename = `${file}${file.endsWith('.png') ? '' : '.png'}`;
      appMetadata.screenshots[i].filename = completeFilename;
    }
  }
  // TODO: resolve filepaths (use parent's filepath for screenshots if needed).
  // Add app.screenshots[i].fullPath

  if (parentAppMetadata) {
    const baseMetadata = clone(parentAppMetadata);

    // update fields in basedata to appData
    Object.keys(appMetadata).forEach((key) => {
      const value = appMetadata[key];
      if (key !== 'extends') {
        baseMetadata[key] = value;
      }
    });
    // if support email is not provided within app, inherent catalog's default
    if (!baseMetadata.supportEmail) {
      baseMetadata.supportEmail = catalogMetadata.defaultSupportEmail;
    }
    return baseMetadata;
  }
  // app has no parent
  // if support email is not provided within app, inherent catalog's default
  if (!appMetadata.supportEmail) {
    appMetadata.supportEmail = catalogMetadata.defaultSupportEmail;
  }
  return appMetadata;


  // TODO: add more metadata to the store
  // add app without tags,
  // add parent of parent of parent, invalid app to test if it crashes
  // TODO: call serveScreenshots
};
