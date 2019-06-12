const fileExists = require('./fileExists');
const readJSON = require('./readJSON');
/**
 * Reads the credentials file in JSON format, throws an error
 *   if the file doesn't exist or if the file is malformed
 * @module server/Store/helpers/loadIcon
 * @param {string} jpgPath - the potential path of the file
 * @param {string} jpegPath - the potential path of the file
 * @param {string} pngPath - the potential path of the file
 * @param {App} parentAppMetadata - metadata for the parent app (if this
 *   app has one)
 * @return {string} the fullPath of the icon
 */
module.exports = async (jpgPath, jpegPath, pngPath, parentAppMetadata) => {
  if (!await fileExists(jpgPath) && !await fileExists(jpegPath)
  && !await fileExists(pngPath)) {
    // file does not exist but has parent
    if (parentAppMetadata) {
      return parentAppMetadata.icon.fullPath;
    }
    // file does not exist and does not have parent
    throw new Error('We cannot load the icon because the file does not exist');
  }

  // file exists
  return (await fileExists(jpgPath)) ? jpgPath : (await fileExists(pngPath) ? pngPath : jpegPath);
};
