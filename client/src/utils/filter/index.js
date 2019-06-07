// Import helpers
const filterByQuery = require('./filterByQuery');
const excludeTagName = require('./excludeTagName');
const filterByTags = require('./filterByTags');

module.exports = (opts) => {
  // Deconstruct opts
  const {
    apps,
    tags,
    query,
    tagNameToExclude,
  } = opts;

  // Filter by query
  const appsFilteredByQuery = filterByQuery(apps, query);
};
