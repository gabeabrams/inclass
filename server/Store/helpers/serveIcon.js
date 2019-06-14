const express = require('express');
const path = require('path');
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
module.exports = (opts) => {
  // TODO: serve the app's icon
  // use app.icon.fullPath

  // Use this path: /public/<catalogId>/<appId>/icon

  const {
    expressApp,
    catalogId,
    appId,
    app,
  } = opts;
  const webPath = `/public/${catalogId}/${appId}/icon/`;

  // Checks if app object has icon property
  if (app.icon) {
    const appWithURL = app;
    const { fullPath } = appWithURL.icon;
    try {
      /**
         * Serves icon.fullPath to
         * /public/<catalogId>/<appId>/icon/<filename>
         * Will throw 404 if file doesn't exist (fallthrough)
         */
      expressApp.use(webPath, express.static(fullPath, { fallthrough: false }));
    } catch (error) {
      const errMessage = `The app ${appId} in catalog ${catalogId} listed an icon with filename ${filename}, but that file does not exist`;
      throw new Error(errMessage);
    }
    appWithURL.icon.url = path.join(webPath, fullPath);
    return appWithURL;
  }
  return app;
};
