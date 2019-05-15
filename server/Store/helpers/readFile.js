const fs = require('fs');

module.exports = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, contents) => {
      if (err) {
        reject(err);
      } else {
        resolve(contents);
      }
    });
  });
};
