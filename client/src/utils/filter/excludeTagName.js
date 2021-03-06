const clone = require('fast-clone');

/**
 * Returns a new tags object with the tagNameToExclude excluded
 * @param {object} tags - the original tags object, a tag mapping that stores
 *   whether values are checked:
 *   { tagName => { color, values: { tagValue => isChecked }}}
 * @param {string} tagNameToExclude - the tagName to exclude
 * @return {object} new tags object with the tagNameToExclude removed
 */
module.exports = (tags, tagNameToExclude) => {
  // Makes a deep clone of tags without changing original
  const newTags = clone(tags);

  // Delete tagName from newTags
  delete newTags[tagNameToExclude];

  return newTags;
};
