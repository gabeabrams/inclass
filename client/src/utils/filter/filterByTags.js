/**
 * Filters the list of apps based on the text query
 * @param {object[]} apps - the list of apps to filter
 * @param {object} tags - tag mapping that stores whether values are checked:
 *   { tagName => { color, tagValues: { tagValue: isChecked }}}
 * @return {object[]} apps that for each tag that has a mix of checked and
 *   unchecked tagValues, the app has at least one tagValue that is checked
 */
module.exports = (apps, tags) => {

  // Filters list of apps based on whether the app has at least one checked item
  const filterApps = apps.filter((app) => {

   // This gets the app tags' values:
   const appTags = Object.keys(app.tags);

   // Looking for each app tag, returns true if each one has at least one value
   // that is checked
   const everyOneChecked = appTags.every((tagName) => {
     // If the tags mapping doesn't have a certain tagName, we want to skip it
     if (tags[tagName] === undefined) {
       return true;
     }

     // The list of tags in an app: ex. free, expensive, import, export
     const tagValues = app.tags[tagName];

     // Using that list of tags, check if any of them are checked
     const atLeastOneItemIsChecked = tagValues.some((itemName) => {
       // Check if any of the itemNames are true in the tags
       return tags[tagName].tagValues[itemName];
     });

     return atLeastOneItemIsChecked;
    });

    return everyOneChecked;
  });
  return filterApps;
};
