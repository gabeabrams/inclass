const fileExists = require('./fileExists');
const readFile = require('./readFile');
/**
 * Reads a XML file into text file, throws an error if the file doesn't exist or
 *   if the file is malformed
 * @module server/Store/helpers/readXML
 * @param {string} path - the path of the file to read and parse
 * @return {string} the text of the XML file
 */
module.exports = async (path) => {
  // If the path doesn't end with ".json", append ".json" first
  const fixedPath = `${path}${path.endsWith('.xml') ? '' : '.xml'}`;

  // throw an error if the file doesn't exist:
  if (!await fileExists(fixedPath)) {
    throw new Error(`We couldn't load the app store metadata because the file ${fixedPath} does not exist`);
  }
  // read the file as text
  try {
    const fileContent = await readFile(fixedPath);
    return fileContent;
  } catch (err) {
    // throw an error if the file cannot be read properly
    throw new Error(`We couldn't load the app store metadata because the file ${fixedPath} is not formatted properly`);
  }
};
