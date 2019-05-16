const path = require('path');
const readJSON = require('../server/Store/helpers/readJSON');
const listFolders = require('../server/Store/helpers/listFolders');
const STORE_PATH = require('../server/Store/STORE_PATH');
const listapps = require('../server/Store/helpers/listAppsToLoad');
const loadCatalogMetadata = require('../server/Store/helpers/loadCatalogMetadata');
const loadStoreMetadata = require('../server/Store/helpers/loadStoreMetadata');
const loadStore = require('../server/Store/helpers/loadStore');

const main = async () => {
  // test for readJSON.js
  // const storeMetadata = await readJSON(path.join(__dirname, '..', 'store/metadata'));
  // console.log(path.join(__dirname));
  // console.log(storeMetadata);

  // test for listAppsToLoad.js
  const test = await listapps();
  // for ((key, value) in test) {
  //   console.log(key);
  // }

  console.log(test);
  
  // test for loadCatalogMetadata.js
  // const metadata = await loadCatalogMetadata('seas');
  // console.log(metadata);

  // test for loadStoreMetadata
  // const metadata = await loadStoreMetadata();
  // console.log(metadata);
  // console.log(metadata.beingEdited);

  // test for loadStore
  // loadStore();
};

main();
