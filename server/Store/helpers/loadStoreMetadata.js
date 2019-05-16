const readJSON = require('./readJSON');
const STORE_PATH = require('../STORE_PATH');

/**
 * Loads catalog metadata
 * @module server/Store/helpers/loadStoreMetadata
 * @return {object} store metadata
 */
module.exports = async () => {
  const metadata = await readJSON(`${STORE_PATH}/metadata`);
  // if beingEdited is true, store will not load
  if (metadata.beingEdited) {
    throw new Error('Metadata being edited. Metadata not loaded.');
  } else {
    return metadata;
  }
};
