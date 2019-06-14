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
  // Helper function to pick a color for our tags
  const getNextRandomColor = () => {
    const color = COLORS[nextColorIndex % COLORS.length];
    nextColorIndex += 1;
    return color;
  };

  // We need to make sure tagsToShow array exists and build it if it doesn't
  // If it doesn't exist, we need to build object from list of tags in apps
  if (!tagsToShow) {
    // Make a Set that we're going to use to collect all of the names we
    // need to add to the tagsToShow object
    const namesForCatalog = new Set();
    apps.forEach((app) => {
      // For each app, we want to look at its list of tags (if it has any) and
      // add them to our set of tagNames
      if (app.tags) {
        Object.keys(app.tags).forEach((name) => {
          // Add name to the set
          namesForCatalog.add(name);
        });
      } else {
        // If app doesn't have a tags object, add it because we'll need it later
        apps[app].tags = {};
      }
    });

    // We now have a set with every name that has appeared in any app
    // Add every name from the set to the tagsToShow Object
    tagsToShow = namesForCatalog.map((name) => {
      // Create a new object to push to the tagsToShow list that will have
      // the name and the color
      return {
        name,
        color: getNextRandomColor(),
      };
    });
  }

  // Now that we have apps and tagsToShow, make sure tag data is correct
  // If tag doesn't have a color, give it one
  tagsToShow.forEach((tag, i) => {
    // If a tag doesn't have a name, throw an error
    if (!tag.name) {
      // Throw an error
      throw new Error(`In Catalog ${catalog.title} in tagsToShow tag #${i + 1}, there is no 'name' field.`);
    }
    // If a tag doesn't have a color attribute or it's empty, we will
    // add a color from the list
    if (!tag.color) {
      tag.color = getNextRandomColor();
      nextColorIndex += 1;
    }

    // Increment through each app and make sure that each one has this name,
    // if not then add it as 'other/uncategorized'
    apps.forEach((app, j) => {
      // If the app doesn't have this name, we add it to the tags object
      // as 'other/uncategorized'
      if (!app.tags[tag.name] || app.tags[tag.name].length === 0// ) {
        app.tags[tag.name] = ['other/uncategorized'];
      }
      apps[j] = app;
    });

    tagsToShow[i] = tag;
  });
  const updatedCatalog = catalog;
  updatedCatalog.tagsToShow = tagsToShow;
  updatedCatalog.apps = apps;

  return updatedCatalog;
};
