const filterByTags = require('./filterByTags');
const excludeTagName = require('./excludeTagName');

/**
 * Generates the counts to show on each tagItem
 * @param {object[]} apps - the list of apps after they are already filtered by
 *   the query
 * @param {object} tags - tag mapping that stores whether values are checked:
 *   { tagName => { color, tagValues: { tagValue: isChecked }}}
 * @return {object} mapping { tagName => tagItem => count } where count is
 *   the number of apps that have that tagItem while all the other tagNames are
 *   applied as filters
 */
module.exports = (tags) => {
  // TODO: implement
};
