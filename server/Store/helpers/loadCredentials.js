const fileExists = require('./fileExists');
const readJSON = require('./readJSON');
/**
 * Reads the credentials file in JSON format, throws an error
 *   if the file doesn't exist or if the file is malformed
 * @module server/Store/helpers/loadCredentials
 * @param {string} path - the path of the file to read and parse
 * @param {App} parentAppMetadata - metadata for the parent app (if this
 *   app has one)
 * @return {string} the text of the XML file
 */
module.exports = async (path, parentAppMetadata) => {
  // If the path doesn't end with ".json", append ".json" first
  const fixedPath = `${path}${path.endsWith('.json') ? '' : '.json'}`;

  // if file does not exist but has parent
  if (!await fileExists(fixedPath)) {
    if (parentAppMetadata) {
      return parentAppMetadata.installationCredentials;
    }
    // file does not exist and does not have a parent
    throw new Error(`We couldn't load the app store metadata because the file ${fixedPath} does not exist`);
  }
  // if the file exist, read the file as text
  const credentials = await readJSON(path);
  return credentials;
};
