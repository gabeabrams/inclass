const path = require('path');

// Detect environment-based store path
// To run the store with a custom path to the store, use:
// export STORE_PATH=/path/to/store
// where the path is relative to the top-level project folder
let storePath;
if (process.env.STORE_PATH) {
  storePath = path.join(process.env.PWD, process.env.STORE_PATH);
} else {
  // No argument-based store path. Use the default
  storePath = path.join(__dirname, '../../store');
}

/**
 * The folder path of the store metadata
 * @module server/Store/STORE_CONSTANTS
 */
module.exports = {
  path: storePath,
};
