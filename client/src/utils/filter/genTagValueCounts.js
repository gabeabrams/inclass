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
module.exports = (apps, tags) => {
  // TODO: implement

  // We need to go through each other filter category

  // Go through each tag in filter cat, if it is checked, look for apps with
  // that tag (filterByTags)
  // FOR EACH app, add it to a new app array (check for dupes) and increment
  // the count

  // Then, we need to go through for each tag in THIS filter category, count
  // how many apps from previous step have this current tag

  // Put this number in this filter tag's count.
};
