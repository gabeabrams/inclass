// Import helpers
import filterByQuery from './filterByQuery';
import excludeTagName from './excludeTagName';
import filterByTags from './filterByTags';

export default (opts) => {
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
