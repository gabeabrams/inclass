const path = require('path')

const readJSON = require('./readJSON');
const STORE_PATH = require('../STORE_PATH');

/**
 * Checks if an app extends any other app. If it does, return that parent. If it
 *   doesn't, return null.
 * @module server/Store/helpers/getAppParent
 * @param {string} catalogId - the id of the catalog holding the app to check
 * @param {string} appId - the id of the app to check
 * @return {object} null if no parent, object of form { catalogId, appId } with
 *   the parent information if the app extends a parent app
 */
module.exports = async (catalogId, appId) => {
  // get the metadata file of the app
  const appPath = path.join(STORE_PATH, catalogId, appId, 'metadata');
  const metadata = await readJSON(appPath);
  if (metadata.extends) {
    // extends property exists
    return metadata.extends;
  }
  // extends property does not exist
  return null;
};
