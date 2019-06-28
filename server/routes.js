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
        message: (
          err.code
            ? err.message
            : 'An unknown error occurred while getting store metadata. If this error continues after a few minutes, please contact an admin.'
        ),
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
    // respond with an error if req.api or req.session.launchInfo does not exist
    if (!req.api || !req.session.launchInfo) {
      throw new Error('We could not load your customized list of apps because we couldn\'t connect to Canvas and process your launch info. Please re-launch. If this error occurs again, contact an admin.');
    }
    try {
      const {
        catalog,
        catalogId,
        isAdmin,
      } = await store.getCatalogAndPermissions(
        req.api,
        req.session.launchInfo
      );

      // Store the catalogId to the user's session
      req.session.catalogId = catalogId;

      // Store isAdmin to the user's session
      req.session.isAdmin = isAdmin;

      // Save the session
      await new Promise((resolve, reject) => {
        req.session.save((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

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
  expressApp.post('/install/:appId', async (req, res) => {
    try {
      const { appId } = req.params;
      const { catalogId } = req.session;
      const installData = store.getInstallData(catalogId, appId);

      let courseId;
      // Try to get courseId from the request, if it's absent, return an error
      try {
        // Make sure launchInfo exists
        ({ courseId } = req.session.launchInfo);
        // We have to check if courseId is undefined
        if (courseId === undefined) {
          return res.json({
            success: false,
            message: 'We could not install this app because we could not determine your launch course. Please contact an admin.',
          });
        }
      } catch (err) {
        return res.json({
          success: false,
          message: 'We could not install this app because we could not determine your launch course. Please contact an admin.',
        });
      }

      // If getInstallData returns null
      // return success is false and error message
      if (!installData) {
        return res.json({
          success: false,
          message: 'We cannot find this app\'s installation details. Please contact an admin.',
        });
      }
      const {
        name,
        description,
        key,
        secret,
        xml,
        launchPrivacy,
      } = installData;

      // Installs the app
      await req.api.course.app.add({
        courseId,
        name,
        key,
        secret,
        xml,
        description,
        launchPrivacy,
      });
      return res.json({ success: true });
    } catch (err) {
      // If error has code then return success is false
      // And what the error message is
      if (err.code) {
        return res.json({
          success: false,
          message: `An error occurred while getting the list of apps in the current catalog: ${err.message}`,
        });
      }
      // If error doesn't have code
      if (!process.env.SILENT) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
      return res.json({
        success: false,
        message: 'An unknown error occurred while installing this app. Please contact an admin.',
      });
    }
  });

  /**
   * Endpoint that uninstalls an app from the current course
   * @param {string[]} ltiIds - the list of lti app ids from Canvas to uninstall
   * @return {object} success description response of the form:
   * {
   *   success: <true/false>,
   *   message: <error message if success is false>,
   * }
   */
  expressApp.delete('/uninstall', async (req, res) => {
    // TODO: implement

    // NOTE: to get the list of ltiIds, use: req.body.ltiIds
  });

  /**
   * Endpoint that returns a list of installed apps
   * @return {object} success description response of the form:
   * {
   *   success: <true/false>,
   *   message: <error message if success is false>,
   *   apps: [
   *     {
   *       ltiIds: array of the lti ids that match this appId,
   *       appId: the app's app store id,
   *     },
   *     ...
   *   ],
   * }
   */
  expressApp.get('/installed-apps', async (req, res) => {
    // TODO: implement
  });

  return store;
};
