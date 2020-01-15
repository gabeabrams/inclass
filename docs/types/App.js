/**
 * App metadata as stored in /store/catalogId/appId/metadata.json
 * @param {object} [extends] - if included, indicates the parent app that this
 *   app extends
 * @param {string} [extends.catalogId] - the catalogId holding the parent app
 * @param {string} [extends.appId] - the appId of the parent app
 * @param {string} [appId] - the appId of the app
 * @param {string} [title] - the title of the app
 * @param {string} [subtitle] - the subtitle of the app
 * @param {string} [description] - a long description of the app
 * @param {string|string[]} [creator] - a string description of the creator or a
 *   list of creators. Upon load, if not a list, we turn this field into a list
 * @param {string|string[]} [placement=['navigation']] - the location(s) that
 *   the app will show up in (may be an array) in Canvas. Allowed values:
 *   navigation, editor, assignment
 * @param {string} [launchPrivacy='public'] - the amount of information that
 *   comes along with the LTI launch request ('public' = all info, 'name_only'
 *   = just the user's name, 'anonymous' = no identification info)
 * @param {string} [supportEmail=the defaultSupportEmail of the catalog] - the
 *   email to direct support issues to when the user requests support
 * @param {string} [requestInstallEmail] - if included, non-admins are not
 *   allowed to install this app on their own. Instead, they are directed to
 *   send an email to this email address requesting an install. Admins are still
 *   allowed to install the app
 * @param {string} [requestUninstallEmail] - if included, non-admins are not
 *   allowed to uninstall this app on their own. Instead, they are directed to
 *   send an email to this email address requesting an uninstall. Admins are
 *   still allowed to uninstall the app
 * @param {string/html} [messageBeforeInstall] - an html message to show to the
 *   user just before installing the app (user has to hit "okay")
 * @param {string/html} [messageAfterInstall] - an html message to show to the
 *   user just after installing the app
 * @param {string/html} [messageBeforeUninstall] - an html message to show to
 *   the user just before uninstalling the app (user has to hit "okay")
 * @param {string/html} [messageAfterUninstall] - an html message to show to the
 *   user just after uninstalling the app
 * @param {object} [tags] - tags associated with the app in the form:
 *   { <tagName>: <tagValue/tagValues> }, for instance:
 *   { cost: 'free', type: ['import', 'export']}
 *   tagValues that are not lists are automatically converted to single-element
 *   lists upon read
 * @param {object[]} [screenshots] - list of screenshots for the app, each of
 *   the form: { title, filename } where filename is the name of the screenshot
 *   file excluding the containing folder. Thus, the file is located at:
 *   /store/catalogId/appId/screenshots/<filename>.
 *   Each screenshot also has a url which is added after loading.
 * @param {object[]} [guides] - list of short guides for users who want to get
 *   started with the app. Each of the form:
 *   { title, steps: [step1String, step2String, ...]}
 * @param {object} [icon] - data on the app's icon (added dynamically, not in
 *   metadata.json) in the form { fullPath, url }. fullPath is added during load
 *   and url is added once the icon has been served
 */
