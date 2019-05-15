/**
 * Catalog metadata as stored in /store/catalogId/metadata.json
 * @param {string} title - the short title of the catalog
 * @param {number[]} [accounts] - a list of Canvas accountIds that are
 *   associated with this catalog. When launching the app store from a course
 *   inside of one of these accounts, the user will be shown this catalog
 * @param {object} [tagColors] - if excluded, all tags in all apps are shown and
 *   assigned random colors. If included, only the tags listed in this object
 *   are shown and the colors listed here will be used (color must be acceptable
 *   css: '#123456' or 'blue' etc).
 *   Form: { tagName: color }
 *   For example: { cost: '#59178e', type: 'red' }
 * @param {string} [defaultSupportEmail] - a default support email to use if
 *   an app doesn't have a support email
 */
