const fs = require('fs');

module.exports = (path) => {
  return new Promise((resolve) => {
    fs.stat(path, (err) => {
      return resolve(!err);
    });
  });
};
