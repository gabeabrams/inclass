const path = require('path');

/**
 * The folder path of the store metadata
 * @module server/Store/STORE_CONSTANTS
 */
module.exports = {
  path: path.join(__dirname, '../../store'),
  hotReloadSecs: 5,
};
