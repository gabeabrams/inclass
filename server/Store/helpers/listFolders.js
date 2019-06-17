const path = require('path');
const fs = require('fs');

/**
 * Lists all the folders within a folder (just the name of the folder, not the
 *   full path)
 * @module server/Store/helpers/listFolders
 * @param {string} path - the path to the enclosing folder to search
 * @return {string[]} the names of all the folders in the enclosing folder
 */
module.exports = (folderPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, list) => {
      if (err) {
        reject(err);
      } else {
        // Check if these are directories
        const folders = (
          list
            .filter((name) => {
              return !name.startsWith('.');
            })
            .filter((name) => {
              const itemPath = path.join(folderPath, name);
              return fs.lstatSync(itemPath).isDirectory();
            })
        );
        resolve(folders);
      }
    });
  });
};
