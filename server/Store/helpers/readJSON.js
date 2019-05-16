const fileExists = require('./fileExists');
const readFile = require('./readFile');
/**
 * Reads a json file and parses it, throws an error if the file doesn't exist or
 *   if the file is malformed
 * @module server/Store/helpers/readJSON
 * @param {string} path - the path of the file to read and parse
 * @return {object} the parsed json object
 */
module.exports = async (path) => {
  // If the path doesn't end with ".json", append ".json" first
  const fixedPath = `${path}${path.endsWith('.json') ? '' : '.json'}`;

  // throw an error if the file doesn't exist:
  if (!await fileExists(fixedPath)) {
    throw new Error(`We couldn't load the app store metadata because the file ${path} does not exist`);
  }
  // read the file, parse it, and return
  try {
    const fileContent = await readFile(fixedPath);
    return JSON.parse(fileContent);
  } catch (err) {
    // throw an error if the file cannot
    // be properly parsed using JSON.parse
    throw new Error(`We couldn't load the app store metadata because the file ${path} is not formatted properly`);
  }
};
