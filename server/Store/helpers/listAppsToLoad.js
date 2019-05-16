const listFolders = require('../helpers/listFolders');
const STORE_PATH = require('../STORE_PATH');

/**
 * Crawls store metadata to get all of the apps that we need to load
 * @module server/Store/helpers/listAppsToLoad
 * @return {object} app list of form { catalogId => appId => l }
 */
module.exports = async () => {
  // create return object
  let obj = {};
  // list all catalogs
  const catalogIds = await listFolders(STORE_PATH);
  // populate object
  for (let i = 0; i < catalogIds.length; i++) {
    obj[catalogIds[i]] = {};
    const apps = await listFolders(`${STORE_PATH}/${catalogIds[i]}`);
    for (let j = 0; j < apps.length; j++) {
      obj[catalogIds[i]][apps[j]] = `${STORE_PATH}/${catalogIds[i]}/${apps[j]}`;
    }
  }
  return obj;
};
