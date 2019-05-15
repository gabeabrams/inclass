/**
 * Serves the screenshots for each app
 * @module server/Store/helpers/serveScreenshots
 * @param {express app} expressApp - the express app to adds routes to
 * @param {App} app - an app that was just loaded
 * @return {App} new app object with a
 *   new app.screenshots[i].url field for each screenshot (the screenshot's url)
 */
module.exports = async (expressApp, app) => {
  // TODO: serve the app's screenshots individually
  // use app.screenshots[i].fullPath

  // Use this path: /resources/store/<catalogId>/<appId>/screenshots/<filename>
};
