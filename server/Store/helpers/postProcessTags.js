// Colors we're going to be using for the tags
const COLORS = [
  '#0096ff', // blue
  '#ff9300', // orange
  '#008e00', // green
  '#8c3437', // red
  '#672980', // purple
  '#0432ff', // dark blue
  '#ff2f92', // pink
  '#00d8af', // turquoise
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
  const { apps } = catalog;
  let { tagsToShow } = catalog;

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
    Object.keys(apps).forEach((appId) => {
      const app = apps[appId];
      // For each app, we want to look at its list of tags (if it has any) and
      // add them to our set of tagNames
      if (app.tags) {
        Object.keys(app.tags).forEach((name) => {
          // Add name to the set
          namesForCatalog.add(name);
        });
      }
    });

    // We now have a set with every name that has appeared in any app
    // Add every name from the set to the tagsToShow Object
    tagsToShow = Array.from(namesForCatalog).map((name) => {
      // Create a new object to push to the tagsToShow list that will have
      // the name and the color
      return {
        name,
        color: getNextRandomColor(),
      };
    });
  }

  // If app doesn't have a tags object, add it as an empty object
  Object.keys(apps).forEach((appId) => {
    if (!apps[appId].tags) {
      apps[appId].tags = {};
    }
  });

  // If an app has tags that aren't in tags to show, remove those tags
  const tagShown = {}; // tagName => true if shown
  tagsToShow.forEach((tagToShow) => {
    tagShown[tagToShow.name] = true;
  });
  Object.keys(apps).forEach((appId) => {
    // Loop through tag names
    Object.keys(apps[appId].tags).forEach((tagName) => {
      if (!tagShown[tagName]) {
        delete apps[appId].tags[tagName];
      }
    });
  });

  // Now that we have apps and tagsToShow, make sure tag data is correct
  // If tag doesn't have a color, give it one
  tagsToShow.forEach((originalTag, i) => {
    const tag = originalTag;

    // If a tag doesn't have a name, throw an error
    if (!tag.name) {
      // Throw an error
      throw new Error(`In Catalog ${catalog.title} in tagsToShow tag #${i + 1}, there is no 'name' field.`);
    }
    // If a tag doesn't have a color attribute or it's empty, we will
    // add a color from the list
    if (!tag.color) {
      tag.color = getNextRandomColor();
    }

    // Increment through each app and make sure that each one has this name,
    // if not then add it as 'other/uncategorized'
    Object.keys(apps).forEach((appId) => {
      const app = apps[appId];
      // If the app doesn't have this name, we add it to the tags object
      // as 'other/uncategorized'
      if (!app.tags[tag.name] || app.tags[tag.name].length === 0) {
        const newApp = app;
        newApp.tags[tag.name] = ['other/uncategorized'];
        apps[appId] = newApp;
      }
    });

    tagsToShow[i] = tag;
  });

  // Save the changes
  const updatedCatalog = catalog;
  updatedCatalog.tagsToShow = tagsToShow;
  updatedCatalog.apps = apps;

  return updatedCatalog;
};
