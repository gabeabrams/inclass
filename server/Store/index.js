/**
 * Class that represents the store metadata. Automatically loads, processes,
 *   and updates app store metadata
 * @class server/Store
 */

/* ------------------------- Store Class ------------------------ */
const loadStore = require('./helpers/loadStore');

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
      this.storeMetadata = store;
      Object.values(catalogs)
    } catch (error) {

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
    // TODO: implement
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
    // TODO: implement
  }

  /**
   * Returns the store metadata
   * @return {object} store metadata
   */
  getStoreMetadata() {
    // TODO: implement
  }
}

// Export the class
module.exports = Store;
