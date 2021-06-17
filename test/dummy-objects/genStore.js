/**
 * Creates a fake Store class
 * @param {object} storeMetadata - the store metadata to return
 * @param {Catalog} catalog - the catalog to return
 * @return {Store} the fake store
 */
module.exports = (opts) => {
  const {
    storeMetadata,
    catalog,
  } = opts;

  /* eslint-disable class-methods-use-this */
  class Store {
    getStoreMetadata() {
      return storeMetadata;
    }

    async getCatalog(api, launchInfo) {
      if (!api) {
        throw new Error('API not included');
      }

      if (!launchInfo || !launchInfo.courseId) {
        throw new Error('Launch info not included or not defined properly');
      }

      return { catalog };
    }
  }

  return Store;
};
