const path = require('path');
// this is used for cloning the parent
const clone = require('fast-clone');
const readJSON = require('./readJSON');
const readXML = require('./readXML');
const loadCredentials = require('./loadCredentials');
const loadIcon = require('./loadIcon');
const STORE_CONSTANTS = require('../STORE_CONSTANTS');

const STORE_PATH = STORE_CONSTANTS.path;

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
  const appMetadataPath = path.join(STORE_PATH, catalogId, appId, 'metadata');
  const appMetadata = await readJSON(appMetadataPath);

  // Set default value for launchPrivacy
  appMetadata.launchPrivacy = appMetadata.launchPrivacy || 'public';

  // read XML file here
  const xmlPath = path.join(STORE_PATH, catalogId, appId, 'install.xml');
  const installXML = await readXML(xmlPath, parentAppMetadata);
  appMetadata.installXML = installXML;

  // read credentials.json here
  const credPath = path.join(STORE_PATH, catalogId, appId, 'credentials');
  const credData = await loadCredentials(credPath, parentAppMetadata);
  appMetadata.installationCredentials = credData;

  // load the app icon
  const iconPathWithoutExt = path.join(STORE_PATH, catalogId, appId, 'icon');
  const iconFullPath = await loadIcon(iconPathWithoutExt, parentAppMetadata);
  appMetadata.icon = { fullPath: iconFullPath };

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

  // if creator is not an array, turn it into one
  if (appMetadata.creator && !Array.isArray(appMetadata.creator)) {
    appMetadata.creator = [appMetadata.creator];
  }

  // Add .png to screenshot path if it doesn't end with screenshot
  // Add app.screenshots[i].fullPath
  if (appMetadata.screenshots) {
    for (let i = 0; i < appMetadata.screenshots.length; i++) {
      const file = appMetadata.screenshots[i].filename;
      const hasExtension = (
        file.endsWith('.png')
        || file.endsWith('.jpg')
        || file.endsWith('.jpeg')
      );
      const completeFilename = `${file}${hasExtension ? '' : '.png'}`;
      appMetadata.screenshots[i].filename = completeFilename;
      // If app already has screenshot object, just add fullpath to it
      appMetadata.screenshots[i].fullPath = path.join(STORE_PATH, catalogId, appId, 'screenshots', completeFilename);
    }
  }

  // If the app extends from parent app, clone parent's metadata then update
  if (parentAppMetadata) {
    const baseMetadata = clone(parentAppMetadata);

    // update fields in basedata to appData
    Object.keys(appMetadata).forEach((key) => {
      const value = appMetadata[key];
      if (key !== 'extends') {
        baseMetadata[key] = value;
      }
    });
    return baseMetadata;
  }
  // if support email is not provided within app, inherent catalog's default
  if (!appMetadata.supportEmail) {
    appMetadata.supportEmail = catalogMetadata.defaultSupportEmail;
  }
  return appMetadata;
};
