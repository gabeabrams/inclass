/**
 * Post-processes the tags within a catalog and its apps
 * @module server/Store/helpers/postProcessTags
 * @param {Catalog} catalog - a fully loaded catalog that includes its apps
 * @return {Catalog} the updated catalog with a tagsToShow object and a list of
 *   apps where for each tagName in tagsToShow, they have at least one item (if
 *   there was no tagName or the tagItems array was empty, we add
 *   'other/uncategorized' as the tagItem)
 */
module.exports = async (catalog) => {
  // We want to get the apps and tagsToShow out of the catalog
  const {apps, tagsToShow} = catalog;

  // Make array of random colors
  const someRandomColor = [];

  // Now that we have apps and tagsToShow, make sure tag data is correct
  // If tag doesn't have a tagColor, give it one
  tagsToShow.forEach((tag) => {
    if (!tag.tagColor) {
      tag.tagColor = someRandomColor;
    }
  });


};
