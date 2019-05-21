/**
 * Filters the list of apps based on the text query
 * @param {object[]} apps - the list of apps to filter
 * @param {string} query - the string to filter by (checks for substrings in the
 *   title, subtitle, description -- all case insensitive)
 * @return {object[]} apps that match the query
 */
export default (apps, query) => {
  // If query empty/whitespace, return all apps -> check first
  // If query all apps, return all apps
  if (query === null or query === '') {
    return apps;
  }
  // Make a new list to add the apps we want to return

  // Go through each app in the list
  // If the title, subtitle, or description (if it exists) match CASE
  // INSENSITIVE, add app to new list


  // Otherwise, move on

};
