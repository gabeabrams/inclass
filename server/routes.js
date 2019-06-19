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
    // Get the store metadata using the getStoreMetadata function
    // If that doesn't work, we throw an error
    try {
      const storeMetadata = store.getStoreMetadata();
      // If storeMetadata 'exists' but is empty, we want to show an error
      if (!storeMetadata || Object.keys(storeMetadata).length === 0) {
        return res.json({
          success: false,
          message: 'Store metadata is not ready. If this error continues after a few minutes, please contact an admin.',
        });
      }
      return res.json({
        success: true,
        store: storeMetadata,
      });
    } catch (err) {
      if (!err.code) {
        console.log(err);
      }
      return res.json({
        success: false,
        message: (err.code ? err.message : 'An unknown error occurred while getting store metadata. If this error continues after a few minutes, please contact an admin.'),
      });
    }
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
    // TODO: respond with an error if req.api or req.session.launchInfo does
    //   not exist
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
