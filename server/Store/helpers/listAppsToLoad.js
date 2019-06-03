// Import dependencies
const path = require('path');

// Import our own helpers
const listFolders = require('../helpers/listFolders');
const STORE_CONSTANTS = require('../STORE_CONSTANTS');

const STORE_PATH = STORE_CONSTANTS.path;

/**
 * Crawls store metadata to get all of the apps that we need to load
 * @module server/Store/helpers/listAppsToLoad
 * @return {object} app list of form { catalogId => appId => appPath }
 */
module.exports = async () => {
  // create return object
  const appsToLoad = {};
  // list all catalogs
  const catalogIds = await listFolders(STORE_PATH);
  // populate object
  for (let i = 0; i < catalogIds.length; i++) {
    appsToLoad[catalogIds[i]] = {};
    const apps = await listFolders(path.join(STORE_PATH, catalogIds[i]));
    apps.forEach((app) => {
      const appPath = path.join(STORE_PATH, catalogIds[i], app);
      appsToLoad[catalogIds[i]][app] = appPath;
    });
  }
  return appsToLoad;
};
