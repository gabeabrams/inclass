const express = require('express');

/**
 * Serve the store's logo
 * @param {string} logoFullPath - the full path of the logo to serve
 * @param {express app} expressApp - the express app to adds routes to
 */
module.exports = (logoFullPath, expressApp) => {
  const webPath = '/public/logo';

  try {
    /*
     * Serves logoFullPath to
     * /public/logo
     * Will throw 404 if any error occurs (fallthrough)
     */
    expressApp.use(
      webPath,
      express.static(logoFullPath, { fallthrough: false })
    );
  } catch (err) {
    const errMessage = 'We ran into an issue preparing the logo for the store';
    throw new Error(errMessage);
  }

  console.log('logoFUllPath: ', logoFullPath);
};
