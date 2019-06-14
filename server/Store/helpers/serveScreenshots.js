const express = require('express');
const path = require('path');

/**
 * Serves the screenshots for an app
 * @module server/Store/helpers/serveScreenshots
 * @param {object} opts - the object holding all args
 * @param {express app} opts.expressApp - the express app to adds routes to
 * @param {string} opts.catalogId - the id of the catalog holding this app
 * @param {string} opts.appId - the id of the app we're loading
 * @param {App} opts.app - an app that was just loaded
 * @return {App} new app object with a
 *   new app.screenshots[i].url field for each screenshot (the screenshot's url)
 */

module.exports = (opts) => {
  // TODO: serve the app's screenshots individually
  // use app.screenshots[i].fullPath
  const {
    expressApp,
    catalogId,
    appId,
    app,
  } = opts;
  const webPath = `/public/${catalogId}/${appId}/screenshots/`;

  // Checks if app object has screenshot property
  if (app.screenshots) {
    // Runs through all the screenshots
    app.screenshots = app.screenshots.map((screenshot) => {
      const screenshotWithURL = screenshot;
      const { fullPath, filename } = screenshotWithURL;
      try {
        /**
         * Serves screenshot.fullPath to
         * /public/<catalogId>/<appId>/screenshots/<filename>
         * Will throw 404 if file doesn't exist (fallthrough)
         */
        expressApp.use(webPath,
          express.static(fullPath, { fallthrough: false }));
      } catch (error) {
        const errMessage = `The app ${appId} in catalog ${catalogId} listed a screenshot with filename ${filename}, but that file does not exist`;
        throw new Error(errMessage);
      }
      screenshotWithURL.url = path.join(webPath, filename);
      return screenshotWithURL;
    });
  }

  // Use this path: /public/<catalogId>/<appId>/screenshots/<filename>
  return app;
};
