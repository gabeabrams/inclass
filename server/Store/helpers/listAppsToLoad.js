// Import dependencies
const path = require('path');

// Import our own helpers
const listFolders = require('../helpers/listFolders');
const STORE_PATH = require('../STORE_PATH');

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
    for (let j = 0; j < apps.length; j++) {
      const appPath = path.join(STORE_PATH, catalogIds[i], apps[j]);
      appsToLoad[catalogIds[i]][apps[j]] = appPath;
    }
  }
  return appsToLoad;
};
