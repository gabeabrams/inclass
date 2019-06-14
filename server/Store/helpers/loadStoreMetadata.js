const path = require('path');

const readJSON = require('./readJSON');
const STORE_CONSTANTS = require('../STORE_CONSTANTS');

const STORE_PATH = STORE_CONSTANTS.path;

/**
 * Loads catalog metadata
 * @module server/Store/helpers/loadStoreMetadata
 * @return {object} store metadata
 */
module.exports = async () => {
  console.log(path.join(STORE_PATH, 'metadata'));
  const metadata = await readJSON(path.join(STORE_PATH, 'metadata'));
  // if beingEdited is true, store will not load
  if (metadata.beingEdited) {
    throw new Error('Metadata being edited. Metadata not loaded.');
  } else {
    return metadata;
  }
};
