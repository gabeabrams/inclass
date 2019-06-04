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
  const newTags = tags;

  // Go through each tagName, and call filterByTags with the app list and every
  // tag name EXCEPT the one we are currently in
  Object.keys(newTags).forEach((tagName) => {
    // The apps that match based on other filter categories' checks
    const tagsWithoutTagName = excludeTagName(newTags, tagName);
    const filteredApps = filterByTags(apps, tagsWithoutTagName);
    console.log(filteredApps);
    // Now we go through each tagValue in this tagName and count how many of
    // those apps have it checked -> filter? And that number is the count for
    // that tagValue

    console.log('tagName is', tagName);
    // array of tagValues for a given tagName ex. 'free' or 'expensive'
    const tagVals = Object.keys(newTags[tagName].tagValues);
    console.log('tagValues', tagVals);
    // Go through each tagValue in this current tag
    tagVals.forEach((tagItem) => {
      console.log('tagValue is', tagItem);
      console.log(`Searching for ${tagItem} in filtered apps`);
      const countedApps = filteredApps.filter((app) => {
        console.log(`Inside app ${app.name}`);
        console.log('tagItem is', tagItem);
        // Will return the app if the given tagValue exists, false if not
        console.log('DEBUGGING');
        // Go through the array of this tagName (ex. 'cost') in this app and
        // check if the array has the tagItem we're looking for (ex. 'free')
        console.log('App array of tagName tags', app.tags[tagName]);
        console.log(`App's tag tagValue is ${app.tags[tagName]}`);
        return app.tags[tagName].some((appTagItem) => {
          console.log(`appTagItem is ${appTagItem}`);
          console.log(`tag's tagItem is ${tagItem}`);
          return (appTagItem === tagItem);
        });
      });
      console.log('Counted apps is ', countedApps);
    });
  });
};
