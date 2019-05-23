/**
 * Returns a new tags object with the tagNameToExclude excluded
 * @param {object} tags - the original tags object, a tag mapping that stores
 *   whether values are checked:
 *   { tagName => { color, tagValues: { tagValue: isChecked }}}
 * @param {string} tagNameToExclude - the tagName to exclude
 * @return {object} new tags object with the tagNameToExclude removed
 */
export default (tags, tagNameToExclude) => {
  // Check if tag has the property first
  if (tags.hasOwnProperty(tagNameToExclude)) {
    // If it exists, delete it
    delete tags[tagNameToExclude];
  }

  return tags;
};
