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
  // TODO: figure out which catalog to show
  // TODO: first, check if the current user can access the catalog for this
  // course, then if that fails, check if they have access to any of the
  // *other* accounts in the catalog. If true at all, set isAdmin to true
  const { courseId } = launchInfo;
  // ES-Lint didn't like having courseId: courseId (Fix later if bad syntax)
  const number = courseId;
  const myCourse = await api.course.get({ courseId: number });
  const { accountId } = myCourse;
};
