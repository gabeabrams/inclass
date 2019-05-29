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
  const courseNumber = launchInfo.courseId;

  const myCourse = await api.course.get({ courseId: courseNumber });
  const myAccountId = myCourse.account_id;

  let catalogId;
  let matchAccounts;
  let isAdmin;

  // Go through each catalog
  if (catalogs) {
    Object.keys(catalogs).forEach((id) => {
      if (catalogs[id].accounts) {
        const { accounts } = catalogs[id];
        /**
         * Go through all accounts in each catalog
         * searching for matching accountIds
         */
        for (let i = 0; i < accounts.length; i++) {
          if (myAccountId === accounts[i]) {
            catalogId = id;
            matchAccounts = accounts;

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
    await api.account.get({ accountId: myAccountId });
    isAdmin = true;
  } catch (error) {
    for (let i = 0; i < matchAccounts.length; i++) {
      if (matchAccounts[i] !== myAccountId) {
        try {
          await api.account.get({ accountId: matchAccounts[i] });
          isAdmin = true;
          break;
        } catch (err) {
          isAdmin = false;
        }
      }
    }
  }
  return { catalogId, isAdmin };
};
