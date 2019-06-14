/**
 * Catalog metadata as stored in /store/catalogId/metadata.json
 * @param {string} title - the short title of the catalog
 * @param {number[]} [accounts] - a list of Canvas accountIds that are
 *   associated with this catalog. When launching the app store from a course
 *   inside of one of these accounts, the user will be shown this catalog
 * @param {object[]} [tagsToShow] - if excluded, all tags from all the apps are
 *   shown to the user. This is an array of objects of the form:
 *   { name, color } where color is an optional css color field. If
 *   this array is included, the names in this array are the only tagNames to be
 *   shown to the user. The color field is optional and auto-populated with
 *   a random color if excluded
 * @param {string} [defaultSupportEmail] - a default support email to use if
 *   an app doesn't have a support email
 * @param {object} [apps] - this property is added upon load and is of form:
 *   { appId: appObject } (loadStore.js adds this property by crawling the
 *   folders inside of the catalog and dynamically finding all the apps)
 */
