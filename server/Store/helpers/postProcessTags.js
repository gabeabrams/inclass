const COLORS = [
  '#701938',
  '#12327c',
  '#236842',
  '#3c1b43',
  '#4f3814',
  '#ff2f92',
  '#ff9300',
  '#4f2563',
  '#005392',
  '#929000',
];

/**
 * Post-processes the tags within a catalog and its apps
 * @module server/Store/helpers/postProcessTags
 * @param {Catalog} catalog - a fully loaded catalog that includes its apps
 * @return {Catalog} the updated catalog with a tagsToShow object and a list of
 *   apps where for each tagName in tagsToShow, they have at least one item (if
 *   there was no tagName or the tagItems array was empty, we add
 *   'other/uncategorized' as the tagItem)
 */
module.exports = (catalog) => {
  // We want to get the apps and tagsToShow out of the catalog
  const { apps, tagsToShow } = catalog;

  // We need to make sure tagsToShow object exists and build it if it doesn't
  // If it doesn't exist, we need to build object from list of tags in apps
  if (!tagsToShow) {
    // Make a Set that we're going to use to collect all of the tagNames we
    // need to add to the tagsToShow object
    const tagNamesForCatalog = new Set();
    apps.forEach((app) => {
      // For each app, we want to look at its list of tags and add them to our
      // set of tagNames
      if (app.tags) {
        Object.keys(apps.tags).forEach((tagName) => {
          tagNamesForCatalog.add(tagName);
        });
      }
    });
  }

  // Set object for list of tags

  // Make array of random colors
  let nextColorIndex = 0;

  // Now that we have apps and tagsToShow, make sure tag data is correct
  // If tag doesn't have a tagColor, give it one
  tagsToShow.forEach((tag) => {
    // If a tag doesn't have a tagColor attribute or it's empty, we will
    // add a color from the list
    if (!tagsToShow[tag].tagColor) {
      tagsToShow[tag].tagColor = COLORS[nextColorIndex % COLORS.length];
      nextColorIndex += 1;
    }
  });
  const updatedCatalog = catalog;
  updatedCatalog.tagsToShow = tagsToShow;
};
