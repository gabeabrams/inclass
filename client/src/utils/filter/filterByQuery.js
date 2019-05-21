/**
 * Filters the list of apps based on the text query
 * @param {object[]} apps - the list of apps to filter
 * @param {string} query - the string to filter by (checks for substrings in the
 *   title, subtitle, description -- all case insensitive)
 * @return {object[]} apps that match the query
 */
export default (apps, query) => {
  // If query null/empty/only whitespace, return all apps
  if (query === null || query === '' || query.match(/^\s+$/) !== null) {
    return apps;
  }
  // Make a new list to add the apps we want to return
    const goodApps = new Array;
    let length = 0;
  // Go through each app in the list
  // If the title, subtitle, or description (if it exists) match CASE
  // INSENSITIVE, add app to new list
  query = query.toLowerCase();
  for (let i = 0; i < apps.length; i++) {
    // If query matches CASE INSENSITIVE, add and increment length
    if (apps[i].title.toLowerCase() === query || apps[i].subtitle.toLowerCase()
    === query) {
      goodApps[length] = apps[i];
      length += 1;
    }
    else if (apps[i].description.toLowerCase().search(/query/i)) {
      // Look through description for query string
      // TODO: look into methods for searching string for string
    }

  }
};
