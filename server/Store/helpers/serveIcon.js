const express = require('express');
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
  const {
    expressApp,
    catalogId,
    appId,
    app,
  } = opts;
  const webPath = `/public/${catalogId}/${appId}/icon`;

  // Checks if app object has icon property
  const appWithURL = app;
  const { fullPath } = appWithURL.icon;
  try {
    /*
     * Serves icon.fullPath to
     * /public/<catalogId>/<appId>/icon
     * Will throw 404 if file doesn't exist (fallthrough)
     */
    expressApp.use(webPath, express.static(fullPath, { fallthrough: false }));
  } catch (error) {
    const errMessage = 'We ran into an issue';
    throw new Error(errMessage);
  }
  appWithURL.icon.url = webPath;
  return appWithURL;
};
