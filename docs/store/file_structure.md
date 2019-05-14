# Store File Structure

The file structure of the `/store` metadata folder.

## Store:

The store metadata is stored in a single `/store/metadata.json` file with in following form:

```json
{
    "title": "Store Title"
}
```

## Catalogs:

The store is divided into _catalogs_. Each catalog has a folder where the folder name is the `catalogId`. For instance, `/store/dce` would be the "dce" catalog.

Each catalog has its own folder within the `/store` folder. Inside that folder is a metadata file holding info on the catalog `/store/<catalogId>/metadata.json` in the form:

```json
{
    "title": "Catalog Title",
    "accounts": [25, 28],
    "tagColors": {
        "price": "blue",
        "type": "#59178e"
    }
}
```

Description of each item:

- title (string) - the short title of the catalog
- \[accounts\] (number[]) - a list of Canvas accountIds that are associated with this catalog. When launching the app store from a course inside of one of these accounts, the user will be shown this catalog
- \[tagColors\] (object) - if excluded, all tags in all apps are shown and assigned random colors. If included, only the tags listed in this object are shown and the colors listed here will be used (color must be acceptable css: #123456 or 'blue' etc). Form: `{ tagName: color }`

## Apps:

Inside each catalog, there is a set of _apps_. Each app has a folder where the folder name is the `appId`. For instance, `/store/dce/swipein` would be an app with the id of "swipein" inside of the "dce" catalog.

### `metadata.json`

Each app has a metadata file stored at `/store/<catalogId>/<appId>/metadata.json` in the form:

```json
{
    "extends": {
        "catalogId": "seas",
        "appId": "swipein"
    },
    "title": "SwipeIn 2",
    "subtitle": "An app that allows people to swipe into lab",
    "description": "This is a very long description of the same app",
    "creator": ["dce", "seas"],
    "launchPrivacy": "public",
    "supportEmail": "ithelp@harvard.edu",
    "requestInstallEmail": "instructionaltechnology@dce.harvard.edu",
    "requestUninstallEmail": "instructionaltechnology@dce.harvard.edu",
    "messageBeforeInstall": "Remember that this app can only be used by instructors",
    "messageAfterInstall": "Now that the app is installed, please launch the app and follow instructions to get the permissions set up",
    "messageBeforeUninstall": "Once you uninstall this app, attendance information will be deleted!",
    "messageAfterUninstall": "If you want your attendance information restored, please contact support",
    "tags": {
        "price": "free",
        "type": ["attendance", "grading"]
    },
    "screenshots": [
        {
            "title": "Event Chooser",
            "filename": "event_chooser.jpg"
        },
        {
            "title": "Manual Seating Dashboard",
            "filename": "man_dash"
        }
    ],
    "guides": [
        {
            "title": "Getting Started",
            "steps": [
                "Launch the app",
                "Fill in the form",
                "Click 'Go'"
            ]
        },
        {
            "title": "Taking Attendance",
            "steps": [
                "Launch the app",
                "Choose an event",
                "Plug in your swiper",
                "Swipe someone's ID'
            ]
        }
    ]
}
```

Description of each item:

- extends (object) - if included, indicates the parent app that this app extends (the parent app metadata is copied and then any existing fields in this metadata file overwrite the parent app's fields). This object is of the form `{ catalogId, appId }` where `catalogId` is the id of the catalog holding the parent app and `appId` is the id of the parent app
- title (string) - the title of the app
- subtitle (string) - the subtitle of the app
- description (string) - a long description of the app
- creator (string|string[] - a string description of the creator or a list of creators
- \[launchPrivacy=public\] (string) - the amount of information that comes along with the LTI launch request ('public' = all info, 'name_only' = just the user's name, 'anonymous' = no identification info)
- \[supportEmail=the defaultSupportEmail for this catalog\] (string) - the email to direct support issues to when the user requests support
- \[requestInstallEmail\] (string) - if included, non-admins are not allowed to install this app on their own. Instead, they are directed to send an email to this email address requesting an install. Admins are still allowed to install the app
- \[requestUninstallEmail\] (string) - if included, non-admins are not allowed to uninstall this app on their own. Instead, they are directed to send an email to this email address requesting an uninstall. Admins are still allowed to uninstall the app
- \[messageBeforeInstall\] (string/html) - an html message to show to the user just before installing the app (user has to hit "okay")
- \[messageAfterInstall\] (string/html) - an html message to show to the user just after installing the app
- \[messageBeforeUninstall\] (string/html) - an html message to show to the user just before uninstalling the app (user has to hit "okay")
string/html messageAfterUninstall  an html message to show to the user just after uninstalling the app
- \[tags\] (object) - tags associated with the app in the form: `{ <tagName>: <tagValue/tagValues> }`. tagValues that are not lists are automatically converted to single-element lists upon read
- \[screenshots\] (object[]) - list of screenshots for the app, each of the form: { title, filename } where filename is the name of the screenshot file excluding the containing folder. Thus, the file is located at: `/store/catalogId/appId/screenshots/<filename>`. If no extension is given, `.png` is assumed.
- \[guides\] (object[]) - list of short guides for users who want to get started with the app. Each of the form: `{ title, steps: [step1String, step2String, ...]}`

### Screenshots

If your app has screenshots listed in the `metadata.json` file, you need to include those files in a `/screenshot` folder. For instance, for the example `metadata.json` file above, we would need the following files:

- `/store/dce/swipein/screenshots/event_chooser.jpg`
- `/store/dce/swipein/screenshots/man_dash.png`

### Credentials

Each app must have a credentials object `credentials.json`. Remember that these must be kept very secure. Form:

```json
{
    "client_id": <the app's developer key>,
    "client_secret": <the app's developer secret>,
    "consumer_key": <the installation credentials consumer_key>,
    "consumer_secret": <the installation credentials consumer_secret>
}
```
