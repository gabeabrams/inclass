/**
 * Filters the list of apps based on the text query
 * @param {object[]} apps - the list of apps to filter
 * @param {string} query - the string to filter by (checks for substrings in the
 *   title, subtitle, description -- all case insensitive)
 * @return {object[]} apps that match the query
 */
module.exports = (apps, query = '') => {
  // If query empty/only whitespace, return all apps
  if (query.trim() === '') {
    return apps;
  }

  // Make the query a regular expression so we can search for it in any string
  const reQuery = new RegExp(query, 'i');

  // Go through each app in the list
  // If the title, subtitle, or description match, add app to new list
  const goodApps = apps.filter((app) => {
    return (reQuery.test(app.title) || reQuery.test(app.subtitle) ||
      reQuery.test(app.description));
  });
  return goodApps;
};
