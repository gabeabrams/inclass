# Store File Structure

The file structure of the `/store` metadata folder.

## Store:

The store metadata is stored in a single `/store/metadata.json` file with in following form:

```json
{
    "title": "Store Title",
    "beingEdited": true
}
```

**Note:** beingEdited is optional. If it is true, the store is not loaded.

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

^ this is an example metadata file. See the docs in the `/docs/types` folder for more info.

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
    "description": "This is a very long description of the same app", <- May be text or markdown
    "creator": ["dce", "seas"],
    "launchPrivacy": "public",
    "supportEmail": "ithelp@harvard.edu",
    "requestInstallEmail": "InstructionalTechnology@dce.harvard.edu",
    "requestUninstallEmail": "InstructionalTechnology@dce.harvard.edu",
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
                "Swipe someone's ID"
            ]
        }
    ]
}
```

^ this is an example metadata file. See the docs in the `/docs/types` folder for more info.

### Screenshots

If your app has screenshots listed in the `metadata.json` file, you need to include those files in a `/screenshots` folder. For instance, for the example `metadata.json` file above, we would need the following files:

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

### Install XML

Each app must have an install xml object `install.xml`.

### Icon

Each app must have an icon image. It will either be in a file `icon.png` or `icon.jpg`.
