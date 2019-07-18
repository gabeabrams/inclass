const path = require('path');

module.exports = (config) => {
  config.entry[2] = path.join(__dirname, 'src/_isolator_generated_files_/index.js');
  return config;
};
