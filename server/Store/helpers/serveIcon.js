/**
 * Serves the icon for this app
 * @module server/Store/helpers/serveIcon
 * @param {object} opts - the object holding all args
 * @param {express app} opts.expressApp - the express app to adds routes to
 * @param {string} opts.catalogId - the id of the catalog holding this app
 * @param {string} opts.appId - the id of the app we're loading
 * @param {App} opts.app - an app that was just loaded
 * @return {App} new app object with a new app.icon.url field added
 */
module.exports = async (opts) => {
  // TODO: serve the app's icon
  // use app.icon.fullPath

  // Use this path: /public/<catalogId>/<appId>/icon
};
