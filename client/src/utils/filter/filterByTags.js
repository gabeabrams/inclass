/**
 * Filters the list of apps based on the text query
 * @param {object[]} apps - the list of apps to filter
 * @param {object} tags - tag mapping that stores whether values are checked:
 *   { tagName => { color, tagValues: { tagValue: isChecked }}}
 * @return {object[]} apps that for each tag that has a mix of checked and
 *   unchecked tagValues, the app has at least one tagValue that is checked
 */
export default (apps, tags) => {

};
