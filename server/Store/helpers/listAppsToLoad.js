const path = require('path');

const listFolders = require('./helpers/listFolders');
const STORE_PATH = require('./STORE_PATH');

/**
 * Crawls store metadata to get all of the apps that we need to load
 * @module server/Store/helpers/listAppsToLoad
 * @return {object} app list of form { catalogId => appId => folderPath }
 */
module.exports = () => {
  // TODO: crawl store using listFolders and create the list of apps

  // 1. List all catalog ids
  // 2. For each catalog, list all the apps and store their paths

  // Example return:
  // {
  //    dce: {
  //      swipein: '.../store/dce/swipein',
  //      gradeup: '.../store/dce/gradeup',
  //    },
  //    seas: {
  //      swipein: '.../store/seas/sqipein',
  //    }
  // }
  return {};
};
