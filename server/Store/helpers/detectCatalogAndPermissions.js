/**
 * Determines which catalog to show to this user
 * @module server/detectCatalogAndPermissions
 * @param {caccl-api instance} api - a caccl-api instance to use for accessing
 *   the Canvas API
 * @param {object} launchInfo - the launchInfo from the user's LTI launch
 * @param {object} catalogs - mapping { catalogId => catalogObject }
 * @return {object} form { catalogId, isAdmin } where catalogId is the id of the
 *   catalog that this user should be shown and isAdmin is true if the current
 *   user is an admin for the account of the current course or an admin for one
 *   of the accounts that are associated with this catalog
 */
module.exports = async (api, launchInfo, catalogs) => {
  const { courseId } = launchInfo;

  const myCourse = await api.course.get({ courseId });
  const myAccountId = myCourse.account_id;

  let matchCatalogId;
  let matchAccounts;
  let isAdmin;

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

  /**
   * Check if person is admin of account the course is in (accountNum)
   * If not, check if person is admin of
   * any account in the catalog (matchAccounts)
   * isAdmin true, if satisfy one of the statements above
   */
  try {
    await api.account.get({ accountId: matchAccounts[0] });
    isAdmin = true;
  } catch (error) {
    for (let i = 1; i < matchAccounts.length; i++) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await api.account.get({ accountId: matchAccounts[i] });
        isAdmin = true;
        break;
      } catch (err) {
        isAdmin = false;
      }
    }
  }
  return { matchCatalogId, isAdmin };
};
