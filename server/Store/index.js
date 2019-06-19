/**
 * Class that represents the store metadata. Automatically loads, processes,
 *   and updates app store metadata
 * @class server/Store
 */

/* ------------------------- Store Class ------------------------ */
const loadStore = require('./helpers/loadStore');
const serveScreenshots = require('./helpers/serveScreenshots');
const detectCatalogAndPermissions = require('./helpers/detectCatalogAndPermissions');

class Store {
  constructor(expressApp) {
    this.expressApp = expressApp;

    // Initialize metadata variables
    this.storeMetadata = {}; // store metadata object
    this.accountIdToCatalogId = {}; // { accountId => catalogId }
    this.catalogIdToCatalogMetadata = {}; // { catalogId => catalog object }
    this.installData = {};
    // ^ { catalogId => appId => { installXML, installationCredentials } }

    // Perform first load attempt
    this._attemptLoad();
  }

  /**
   * Function that attempts to perform a load. If successful, swaps out our
   *   metadata objects. If failed, leaves current metadata objects as is
   *   and prints error to console.
   * @return {object} states whether the attemptLoad is successful or not
   *   with error message if success is false
   *   {
   *     success: <true if no error occurs, false otherwise>,
   *     message: <only given when success is false>,
   *   }
   */
  async _attemptLoad() {
    try {
      const myStore = await loadStore();
      const { catalogs } = myStore;
      const storeMetadata = myStore.store;
      const accountIdToCatalogId = {};
      const catalogIdToCatalogMetadata = {};
      const installData = {};

      /**
       * Goes through each catalog in catalogs
       *    and create metadata objects.
       * Calls serveScreenshots
       */
      Object.keys(catalogs).forEach((catalogId) => {
        const newCatalog = catalogs[catalogId];
        const { apps } = newCatalog;

        // Creates accountIdToCatalogId metadata object
        if (newCatalog.accounts) {
          newCatalog.accounts.forEach((accountId) => {
            accountIdToCatalogId[accountId] = catalogId;
          });
        }

        /**
         * Runs through each app and does the following:
         * It places installXML & installation credentials
         *  information in installData.
         *  ({catalogId => appId => { installXML, installationCredentials }})
         * Deletes the install information from each app
         * Calls serveScreenshots
         * Saves the updated catalog in catalogIdToCatalogMetadata
         */
        const appIds = Object.keys(apps);
        appIds.forEach((appId) => {
          const { installXML, installationCredentials } = apps[appId];
          // Ensures only one copy per catalog
          if (!installData[catalogId]) {
            installData[catalogId] = {};
          }
          // saves secret credentials to installData
          installData[catalogId][appId] = {
            installXML,
            installationCredentials,
          };

          // deletes those secret credentials from each app
          delete apps[appId].installXML;
          delete apps[appId].installationCredentials;

          // calls serveScreenshots with the secrets-removed app
          const opts = {
            expressApp: this.expressApp,
            catalogId,
            appId,
            app: apps[appId],
          };
          apps[appId] = serveScreenshots(opts);
          // save updated catalog to catalogIdToCatalogMetadata
          catalogIdToCatalogMetadata[catalogId] = newCatalog;
        });
      });

      // Swaps out metadata object
      this.storeMetadata = storeMetadata;
      this.accountIdToCatalogId = accountIdToCatalogId;
      this.catalogIdToCatalogMetadata = catalogIdToCatalogMetadata;
      this.installData = installData;
      return { success: true };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`An error occurred while attempting to load store information: ${error.message}`);
      return { success: false, message: error.message };
    }
  }

  /**
   * Function that determines the catalog we should show the current user based
   *   on the launch course and its account. Also determines if the user is an
   *   admin for the current catalog.
   * @param {caccl-api Instance} api - the caccl-api instance from req.api
   * @param {object} launchInfo - the launch info from req.session.launchInfo
   * @return {object} metadata and permissions in the form:
   * {
   *   catalog: <catalog metadata object>,
   *   catalogId: <catalog id>,
   *   isAdmin: <true if the user is an admin>,
   * }
   */
  async getCatalogAndPermissions(api, launchInfo) {
    const { catalogId, isAdmin } = await detectCatalogAndPermissions(
      api,
      launchInfo,
      this.catalogIdToCatalogMetadata
    );
    const catalog = this.catalogIdToCatalogMetadata[catalogId];
    return {
      catalog,
      catalogId,
      isAdmin,
    };
  }

  /**
   * Returns the app install data
   * @param {string} catalogId - the id of the catalog holding the app to
   *   install
   * @param {string} appId - the id of the app to install
   * @return {object} app install data in form:
   * {
   *   name: <title from app metadata>,
   *   description: <subtitle from app metadata>,
   *   key: <consumer_key from installData>,
   *   secret: <consumer_secret from installData>,
   *   xml: <installXML from installData>,
   *   launchPrivacy: <launchPrivacy from app metadata>,
   * }
   */
  getInstallData(catalogId, appId) {
    if (!this.installData[catalogId]) {
      // No install data for this catalog
      return null;
    }
    if (!this.installData[catalogId][appId]) {
      // No install data for this app
      return null;
    }

    const {
      installXML,
      installationCredentials,
    } = this.installData[catalogId][appId];

    const appData = this.catalogIdToCatalogMetadata[catalogId].apps[appId];
    const { title, description, launchPrivacy } = appData;
    const appInstallData = {
      description,
      launchPrivacy,
      name: title,
      key: installationCredentials.consumer_key,
      secret: installationCredentials.consumer_secret,
      xml: installXML,
    };

    return appInstallData;
  }

  /**
   * Returns the store metadata
   * @return {object} store metadata
   */
  getStoreMetadata() {
    return this.storeMetadata;
  }
}

// Export the class
module.exports = Store;
