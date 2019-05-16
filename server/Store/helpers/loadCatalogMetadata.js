const readJSON = require('./readJSON');
const STORE_PATH = require('../STORE_PATH');


/**
 * Loads catalog metadata
 * @module server/Store/helpers/loadCatalogMetadata
 * @param {string} catalogId - id of the catalog
 * @return {object} catalog metadata
 */
module.exports = async (catalogId) => {
  // read the corresponding metadata to the catalog
  const metadata = await readJSON(`${STORE_PATH}/${catalogId}/metadata`);
  return metadata;
};
