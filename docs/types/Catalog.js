/**
 * Catalog metadata as stored in /store/catalogId/metadata.json
 * @param {string} title - the short title of the catalog
 * @param {number[]} [accounts] - a list of Canvas accountIds that are
 *   associated with this catalog. When launching the app store from a course
 *   inside of one of these accounts, the user will be shown this catalog
 * @param {object[]} [tagsToShow] - if excluded, all tags from all the apps are
 *   shown to the user. This is an array of objects of the form:
 *   { tagName, tagColor } where tagColor is an optional css color field. If
 *   this array is included, the tagNames in this array are the only ones to be
 *   shown to the user. The tagColor field is optional and auto-populated with
 *   a random color if excluded
 * @param {string} [defaultSupportEmail] - a default support email to use if
 *   an app doesn't have a support email
 */
