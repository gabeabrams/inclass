

/**
 * Class that represents the store metadata. Automatically loads, processes,
 *   and updates app store metadata
 * @class server/Store
 */

/* ------------------------- Store Class ------------------------ */

class Store {
  constructor() {
    // TODO: create
    // TODO: start scheduled imports
  }

  async _load() {
    // TODO: attempt to import new metadata, roll back if not successful
  }

  /**
   * Resolves with the catalog requested
   * @param {number} accountId - the id of the account associated with the
   *   catalog we're looking for
   * @return {Catalog} catalog metadata object
   */
  async getCatalog(accountId) {
    // TODO: look up the catalog and return the metadata
  }
}

// Export the class
module.exports = Store;
