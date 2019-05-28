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

  // Duplicate before changing
  let newTags = tags;
  let newApps = apps;

  // return object looks like this:
  const countObj = {
    cost: {
      free: 5,
      expensive: 10,
    },
  };

  // For each filtercategory other than the one we're in,
  // This will give an array of all the tag names, and corresponding values
  const tagNames = Object.keys(newTags);
  const tagComponents = Object.values(newTags);

  tagNames.forEach((tag) => {
    
  });

  // Make an array of the tags that are checked

  // For each tag in that array, filterByTag with app list and that tag.

  // If it isnt already in new app list, add it and add count



  // We need to go through each other filter category
  newTags = Object.values(newTags)

  // Go through each tag in filter cat, if it is checked, look for apps with
  // that tag (filterByTags)
  // FOR EACH app, add it to a new app array (check for dupes) and increment
  // the count

  // Then, we need to go through for each tag in THIS filter category, count
  // how many apps from previous step have this current tag

  // Put this number in this filter tag's count.
};
