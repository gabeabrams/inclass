const fileExists = require('./fileExists');
/**
 * Reads the credentials file in JSON format, throws an error
 *   if the file doesn't exist or if the file is malformed
 * @module server/Store/helpers/loadIcon
 * @param {string} iconPathWithoutExtension - the path of the icon file (excluding extension)
 * @param {App} parentAppMetadata - metadata for the parent app (if this
 *   app has one)
 * @return {string} the fullPath of the icon
 */
module.exports = async (iconPathWithoutExtension, parentAppMetadata) => {
  const jpgPath = `${iconPathWithoutExtension}.jpg`;
  const jpegPath = `${iconPathWithoutExtension}.jpeg`;
  const pngPath = `${iconPathWithoutExtension}.png`;
  // Check for jpg
  if (await fileExists(jpgPath)) {
    return jpgPath;
  }
  // Check for jpeg
  if (await fileExists(jpegPath)) {
    return jpegPath;
  }
  // Check for png
  if (await fileExists(pngPath)) {
    return pngPath;
  }
  // file does not exist, unless parent has icon, this app does not have icon
  if (parentAppMetadata) {
    return parentAppMetadata.icon.fullPath;
  }
  // file does not exist and does not have parent
  throw new Error('We cannot load the icon because the file does not exist');
};
