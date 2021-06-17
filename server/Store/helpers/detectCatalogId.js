/**
 * Determines which catalog to show to this user
 * @module server/detectCatalogId
 * @param {caccl-api instance} api - a caccl-api instance to use for accessing
 *   the Canvas API
 * @param {object} launchInfo - the launchInfo from the user's LTI launch
 * @param {object} catalogs - mapping { catalogId => catalogObject }
 * @return {number} catalogId, the id of the
 *   catalog that this user should be shown
 */
module.exports = async (api, launchInfo, catalogs) => {
  const { courseId } = launchInfo;

  const myCourse = await api.course.get({ courseId });
  const myAccountId = myCourse.account_id;

  let matchCatalogId;
  let matchAccounts;

  // Go through each catalog
  if (catalogs) {
    Object.keys(catalogs).forEach((catalogId) => {
      if (catalogs[catalogId].accounts) {
        const { accounts } = catalogs[catalogId];
        /**
         * Go through all accounts in each catalog
         * searching for matching accountIds
         */
        for (let i = 0; i < accounts.length; i++) {
          if (myAccountId === accounts[i]) {
            matchCatalogId = catalogId;
            matchAccounts = accounts;
            /**
             * Places the matching account into first position
             * Switches out the account in the first position
             * to original position of the matching account
             */
            const firstAcct = matchAccounts[0];
            matchAccounts[0] = matchAccounts[i];
            matchAccounts[i] = firstAcct;

            break;
          }
        }
      }
    });
  }

  // Report an error if no catalog matches the course's account
  if (!matchCatalogId) {
    throw new Error('There is no catalog for this course');
  }

  return matchCatalogId;
};
