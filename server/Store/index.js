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
   *   metadata objects. If failed, leaves current metadata objects as is.
   */
  async _attemptLoad() {
    try {
      const myStore = loadStore();
      const { store, catalogs } = myStore;
      const storeMetadata = store;
      const accountIdToCatalogId = {};
      const catalogIdToCatalogMetadata = {};
      const installData = {};

      Object.keys(catalogs).forEach((catalogId) => {
        const newCatalog = catalogs[catalogId];
        const { apps } = newCatalog;

        if (newCatalog.accounts) {
          newCatalog.accounts.forEach((accountId) => {
            accountIdToCatalogId[accountId] = catalogId;
          });
        }
        catalogIdToCatalogMetadata[catalogId] = Object.keys(apps).map((appId) => {
          const { installXML, installationCredentials } = apps[appId];
          installData[catalogId][appId] = { installXML, installationCredentials };

          delete apps[appId].installXML;
          delete apps[appId].installationCredentials;
          return newCatalog;
        });
        Object.keys(apps).forEach((appId) => {
          const opts = {
            expressApp: this.expressApp,
            catalogId,
            appId,
            app: apps[appId],
          };
          apps[appId] = serveScreenshots(opts);
        });
      });

      this.storeMetadata = storeMetadata;
      this.accountIdToCatalogId = accountIdToCatalogId;
      this.catalogIdToCatalogMetadata = catalogIdToCatalogMetadata;
      this.installData = installData;
    } catch (error) {
      console.log(`An error occurred while attempting to load store information: ${error.message}`);
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
   *   isAdmin: <true if the user is an admin>,
   * }
   */
  async getCatalogAndPermissions(api, launchInfo) {
    return detectCatalogAndPermissions(
      api,
      launchInfo,
      this.catalogIdToCatalogMetadata
    );
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
    return this.installData[catalogId][appId];
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
