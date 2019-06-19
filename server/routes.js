const Store = require('./Store');

module.exports = (expressApp) => {
  // Create an instance of the store
  const store = new Store(expressApp);

  /**
   * Endpoint that returns the store metadata
   * @return {object} store metadata response of the form:
   * {
   *   success: <true/false>,
   *   message: <error message if success is false>,
   *   store: <store metadata if success is true>,
   * }
   */
  expressApp.get('/store', async (req, res) => {
    // TODO: implement
  });

  /**
   * Endpoint that determines the correct catalog for a user and returns the
   *   catalog metadata and also whether or not the user is an admin
   * @return {object} catalog metadata response of the form:
   * {
   *   success: <true/false>,
   *   message: <error message if success is false>,
   *   catalog: <catalog metadata if success is true>,
   *   isAdmin: <included if success is true>,
   * }
   */
  expressApp.get('/catalog', async (req, res) => {
    // respond with an error if req.api or req.session.launchInfo does not exist
    if (!req.api || !req.session.launchInfo) {
      throw new Error('We could not load your customized list of apps because we couldn\'t connect to Canvas and process your launch info. Please re-launch. If this error occurs again, contact an admin.');
    }
    try {
      const { catalog, isAdmin } = await store.getCatalogAndPermissions(
        req.api,
        req.session.launchInfo
      );
      return res.json({
        catalog,
        isAdmin,
        success: true,
      });
    } catch (err) {
      if (err.code) {
        return res.json({
          success: false,
          message: `An error occurred while getting the list of apps in the current catalog: ${err.message}`,
        });
      }
      // if error does not have code, log the error into console
      // eslint-disable-next-line no-console
      console.log(err);
      return res.json({
        success: false,
        message: 'An unknown error occurred while getting the list of apps in the current catalog. Please contact an admin.',
      });
    }
  });

  /**
   * Endpoint that installs an app into the current course
   * @return {object} success description response of the form:
   * {
   *   success: <true/false>,
   *   message: <error message if success is false>,
   * }
   */
  expressApp.get('/catalogs/:catalogId/apps/:appId/install', async (req, res) => {
    // TODO: implement
  });
};
