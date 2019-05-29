/**
 * Filters the list of apps based on the text query
 * @param {object[]} apps - the list of apps to filter
 * @param {object} tags - tag mapping that stores whether values are checked:
 *   { tagName => { color, tagValues: { tagValue: isChecked }}}
 * @return {object[]} apps that for each tag that has a mix of checked and
 *   unchecked tagValues, the app has at least one tagValue that is checked
 */
module.exports = (apps, tags) => {
  // Make new array for apps to keep
  let goodApps = apps;

  // Iterate through app array, and check each tagName in each app to see if
  // it's checked
  // for (let i = 0; i < apps.length; i++) {
  //   for (let j = 0; j < Object.keys(apps[i].tags).length; j++) {
  //     // Avoid adding same app more than once
  //     if (added[i]) {
  //       continue;
  //     }
  //     // If the jth tag's itemName isChecked, then app will be added
  //     else if (Object.keys(apps[i].tags)[j].items[itemName]) {
  //       goodApps.push(apps[i]);
  //       added[i] = true;
  //     }
  //   }
  // }


  // Filter will go through each app and filter the ones out that have a
  // matching tag
  goodApps = goodApps.filter((app) => {
    // This gets the app tags' values:
    const appTags = Object.keys(app.tags);
    appTags.forEach((tag) => {
      // Check in here if the tag is found and 'true' for any tagValue
      return (tag === Object.values(tags))
    });
  });

  return goodApps;
};
