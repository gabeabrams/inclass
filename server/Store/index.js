/**
 * Class that represents the store metadata. Automatically loads, processes,
 *   and updates app store metadata
 * @class server/Store
 */

/* ------------------------- Store Class ------------------------ */

class Store {
  constructor(expressApp) {
    // TODO: create
    // TODO: start scheduled imports
  }

  async _load() {
    // TODO: attempt to import new metadata, roll back if not successful
  }

  /**
   * Resolves with all the catalogs
   * @return {object} mapping { catalogId => catalogObject }
   */
  async getCatalogs(accountId) {
    // TODO: implement
  }
}

// Export the class
module.exports = Store;
