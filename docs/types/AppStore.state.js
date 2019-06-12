/**
 * The state of the front-end React app (AppStore.state)
 * @param {object} tags - data on the current set of tags in the form:
 *   { tagName => { color, values => { tagValue => true if checked, }}}
 *   where color is a css color ('blue' or '#481059') and tagValue is one of
 *   the values that the tag can hold. The tagValue => true/false mapping
 *   represents whether or not the tag is checked by the user. Remember that
 *   functionally, there is no difference between all of the tagItems
 *   unchecked and all the tagItems checked.
 * @param {boolean} filterDrawerOpen - true if the filter drawer is open
 * @param {string} searchQuery - the string that the user typed into the search
 *   bar
 * @param {App[]} allApps - all of the apps in the current catalog
 * @param {string} currentBody - the current body type to show
 *   (BODY_TYPE.APP_LIST/SUPPORT_PAGE/INSTALLED_APP_MANAGER/APP_PAGE)
 * @param {App|null} currentSpecificApp - if null, no specific app is being
 *   shown. If defined, this is the current app that is being shown
 * @param {object} supportModalStatus - the status of the support modal in the
 *   form: { open: <true/false>, email: <support email>, subject: <string>}
 * @param {object} installOrUninstallModalStatus - the status of the install or
 *   uninstall modal in the form: { open: <true/false>, installing: false }
 *   where installing is false if we are uninstalling
 */
