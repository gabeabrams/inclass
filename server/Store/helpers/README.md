## Process that `loadStore.js` orchestrates:

1. Load metadata for store. If `beingEdited` is true, throw error "Metadata being edited. Metadata not loaded."
1. Get the list of apps we need to load via `listAppsToLoad` (uses `listFolders.js` and `readJSON.js` helpers)
1. Load metadata for all catalogs (use `loadCatalogMetadata.js`)
1. `loadStore.js` attempts to load an app using `loadApp.js`, using `getAppParent.js` to crawl the dependency structure to load parents first (must also detect cycles and throw an error if one is found). `loadApp.js` also calls `serveScreenshots.js` to serve the app's screenshots and add an app.screenshots[i].url field.
1. `loadStore.js` keeps track of all loaded apps (so they're not loaded twice)
1. If this whole process goes as planned, the store info map in `Store.js` is updated

## Auto-update

Every minute, attempt to re-load the metadata.
