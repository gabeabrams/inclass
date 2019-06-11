// Colors we're going to be using for the tags
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
  let { apps, tagsToShow } = catalog;

  // Set color index to start at 0
  let nextColorIndex = 0;

  // We need to make sure tagsToShow object exists and build it if it doesn't
  // If it doesn't exist, we need to build object from list of tags in apps
  if (!tagsToShow) {
    tagsToShow = [];
    // Make a Set that we're going to use to collect all of the tagNames we
    // need to add to the tagsToShow object
    const tagNamesForCatalog = new Set();
    apps.forEach((app) => {
      // For each app, we want to look at its list of tags (if it has any) and
      // add them to our set of tagNames
      if (app.tags) {
        Object.keys(app.tags).forEach((tagName) => {
          // Add tagName to the set
          tagNamesForCatalog.add(tagName);
        });
      } else {
        // If app doesn't have a tags object, add it because we'll need it later
        apps[app].tags = {};
      }
    });

    // We now have a set with every tagName that has appeared in any app
    // Add every tagName from the set to the tagsToShow Object
    tagNamesForCatalog.forEach((tagName) => {
      // Create a new object to push to the tagsToShow list that will have
      // the tagName and the tagColor
      const newTag = {
        tagName,
        color: COLORS[nextColorIndex % COLORS.length],
      };
      // Add the new tag to the list of tagsToShow
      tagsToShow.push(newTag);
      // Increment color picker
      nextColorIndex += 1;
    });
  }

  // Now that we have apps and tagsToShow, make sure tag data is correct
  // If tag doesn't have a tagColor, give it one
  tagsToShow.forEach((tag) => {
    // If a tag doesn't have a tagName, throw an error
    if (!tag.tagName) {
      // Error message
      console.error('ERROR: Tag object has no tagName');
      return;
    }
    // If a tag doesn't have a tagColor attribute or it's empty, we will
    // add a color from the list
    if (!tag.color) {
      tag.color = COLORS[nextColorIndex % COLORS.length];
      nextColorIndex += 1;
    }

    // Increment through each app and make sure that each one has this tagName,
    // if not then add it as 'other/uncategorized'
    apps.forEach((app) => {
      // If the app doesn't have this tagName, we add it to the tags object
      // as 'other/uncategorized'
      if (!app.tags[tag.tagName]) {
        app.tags[tag.tagName] = ['other/uncategorized'];
      }
    });
  });
  const updatedCatalog = catalog;
  updatedCatalog.tagsToShow = tagsToShow;
  updatedCatalog.apps = apps;

  return updatedCatalog;
};
