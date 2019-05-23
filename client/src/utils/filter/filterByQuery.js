/**
 * Filters the list of apps based on the text query
 * @param {object[]} apps - the list of apps to filter
 * @param {string} query - the string to filter by (checks for substrings in the
 *   title, subtitle, description -- all case insensitive)
 * @return {object[]} apps that match the query
 */
module.exports = (apps, query) => {
  // If query null/empty/only whitespace, return all apps
  if (query === null || query === '' || query.match(/^\s+$/) !== null) {
    return apps;
  }
  // Make a new list to add the apps we want to return
    const goodApps = [];

  // Make the query a regular expression so we can search for it in any string
  const reQuery = new RegExp(query, 'i');

  // Go through each app in the list
  // If the title, subtitle, or description match, add app to new list
  for (let i = 0; i < apps.length; i++) {
    if (reQuery.test(apps[i].title) || reQuery.test(apps[i].subtitle) ||
    reQuery.test(apps[i].description)) {
      goodApps.push(apps[i]);
    }
  }

  return goodApps;
};
