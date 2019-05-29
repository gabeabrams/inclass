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
  // Duplicate before changing
  let newTags = tags;
  let newApps = apps;

  // This will give an array of all the tag names, and corresponding values
  const tagNames = Object.keys(newTags);
  const tagComponents = Object.values(newTags);

  // Go through each tagName, and call filterByTags with the app list and every
  // tag name EXCEPT the one we are currently in
  tagNames.forEach((tagName) => {
    // The apps that match based on other filter categories' checks
    const newApps = filterByTags(apps, excludeTagName(tagName));
    // Now we go through each tagValue in this tagName and count how many of
    // those apps have it checked -> filter? And that number is the count for
    // that tagValue

  });
    const tagsWithCounts = tagName.map((tagItem) => {
      const countedTag =
    });

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
