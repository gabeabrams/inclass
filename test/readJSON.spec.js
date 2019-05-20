const path = require('path');
const readJSON = require('../server/Store/helpers/readJSON');
const listFolders = require('../server/Store/helpers/listFolders');
const STORE_PATH = require('../server/Store/STORE_PATH');
const listapps = require('../server/Store/helpers/listAppsToLoad');
const loadCatalogMetadata = require('../server/Store/helpers/loadCatalogMetadata');
const loadStoreMetadata = require('../server/Store/helpers/loadStoreMetadata');
const loadStore = require('../server/Store/helpers/loadStore');
const loadApp = require('../server/Store/helpers/loadApp');

const main = async () => {
  // test for readJSON.js
  // const storeMetadata = await readJSON(path.join(__dirname, '..', 'store/metadata'));
  // console.log(path.join(__dirname));
  // console.log(storeMetadata);

  // test for listAppsToLoad.js
  const test = await listapps();
  console.log(test);

  // test for loadCatalogMetadata.js
  const metadata = await loadCatalogMetadata('seas');
  console.log(metadata);

  // test for loadStoreMetadata
  // const metadata = await loadStoreMetadata();
  // console.log(metadata);
  // console.log(metadata.beingEdited);

  // test for loadApp
  // await loadApp({
  //   catalogId: 'seas',
  //   catalogMetadata: metadata,
  //   appId: 'swipein',
  //   parentAppMetadata: null,
  // });

  // test for loadStore
  loadStore();
};
main();
