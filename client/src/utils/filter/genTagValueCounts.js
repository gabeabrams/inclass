const filterByTags = require('./filterByTags');
const excludeTagName = require('./excludeTagName');

/**
 * Generates the counts to show on each tagItem
 * @param {object} apps - the list of apps after they are already filtered by
 *   the query
 * @param {object} tags - tag mapping that stores whether values are checked:
 *   { tagName => { color, values: { tagValue => isChecked }}}
 * @return {object} mapping { tagName => tagItem => count } where count is
 *   the number of apps that have that tagItem while all the other tagNames are
 *   applied as filters
 */
module.exports = (apps, tags) => {
  // Duplicate before changing
  const newTags = tags;

  // Create the tag object that we're going to be returning
  const tagCounts = {}; // { tagName => tagItem => count }

  // Go through each tagName, and call filterByTags with the app list and every
  // tag name EXCEPT the one we are currently in
  Object.keys(newTags).forEach((tagName) => {
    // Add this tagName to the tagCounts object
    tagCounts[tagName] = {};

    // We only want the tags excluding the one we're currently in
    const tagsWithoutTagName = excludeTagName(newTags, tagName);
    // The apps that match based on other filter categories' checks
    const filteredApps = filterByTags(apps, tagsWithoutTagName);

    // array of tagValues for a given tagName ex. 'free' or 'expensive'
    const tagVals = Object.keys(newTags[tagName].values);

    // Go through each tagValue in this current tag ex. 'free'
    tagVals.forEach((tagItem) => {
      // Take the filtered apps that match our other tags, and only count the
      // ones that have this tagItem
      const appIdsWithTag = Object.keys(filteredApps).filter((appId) => {
        const app = apps[appId];
        // Go through the array of this tagName (ex. 'cost') in this app and
        // check if the array has the tagItem we're looking for (ex. 'free')
        // We do not have to worry about the tagName not existing
        return app.tags[tagName].some((appTagItem) => {
          return (appTagItem === tagItem);
        });
      });
      // The count of the apps that match this tagItem's count will be equal to
      // the length of the list of apps we found that tagItem in
      tagCounts[tagName][tagItem] = appIdsWithTag.length;
    });
  });
  // Return completed object
  return tagCounts;
};
