// Import dependencies
const path = require('path');

// Import constants
const STORE_PATH = require('../STORE_PATH');

// Import helpers
const listAppsToLoad = require('./listAppsToLoad');
const readJSON = require('./readJSON');

/**
 * Reads the metadata of the store, reads each catalog, and returns a full
 *   catalog metadata object
 * @module /server/Store/helpers/loadStore
 * @return {object} { catalogId: Catalog } mapping
 * @see /server/Store/helpers/loadStore for description of Catalog object
 */
module.exports = async () => {
  // Load store metadata
  const storeMetadata = await readJSON(path.join(STORE_PATH, 'metadata'));

  // TODO: list the apps to load

  // TODO: load the individual apps in order, detect cycles and throw an error if they occur

  // TODO: load catalogs

  return {};
};

/**
 * Catalog object:
 * {
 *   title: 'DCE',
 *   accounts: [26, 42],
 *   apps: {
 *     appId: <app, see below>,
 *   },
 * }
 *
 * App object:
 *
 * {
 *   "title": "My App",
 *   "extends": {
 *     "catalog": "seas",
 *     "id": "my_app"
 *   },
 *   "creator": string[] or string,
 *   "subtitle": "This is a very cool app",
 *   "description": "This app has so many different features. Let me explain them all to you.",
 *   "launch_privacy": "public", (default is "public")
 *   "support_email": "bob@help.com",
 *   "request_install_email": "bob@help.com",
 *   "request_uninstall_email": "bob@help.com",
 *   "message_before_install": "<strong>Warning!</strong> This app is dangerous!",
 *   "message_after_install": "Oh dear. You did it",
 *   "message_before_uninstall": "Are you really sure you want to delete everything?",
 *   "message_after_uninstall": "You deleted everything!",
 *   "tags": {
 *     "cost": "free", // NOTE: when reading in tags, always turn into a list
 *     "type": [
 *       "import",
 *       "export"
 *     ],
 *   },
 *   screenshots: [
 *     {
 *       "title": "Picture of the Home Screen of My App",
 *       "filename": "home.png",
 *       "alt": "picture of the home screen of my app"
 *     },
 *     ...
 *   ],
 *   guides: [
 *     {
 *       "title": "How to get started",
 *       "steps": [
 *         "Click to launch the app",
 *         "Open the first page of the app"
 *       ]
 *     }
 *   ],
 * }
 */
