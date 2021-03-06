# Set Up Instructions

This README provides information on the file structure of the `/store` metadata folder and the core logic and functions about the store's loading process.

## Store:

The store metadata is stored in a single `/store/metadata.json` file with in following form:

```json
{
    "title": "Store Title",
    "beingEdited": true
}
```

**Note:** beingEdited is optional. If it is true, the store is not loaded. 

#### Hot store reloading
A core function in the loading process is hot store reloading, which reloads all the information the store contains every 5 seconds. In order to temporarily stop the reloading process so the latest changes are not published on the website, set the `beingEdited` property in the store metadata to true. Another situation where the hot store reloading doesn't publish the newest changes is if there exist errors in the loading process. In this case, the app store maintains the state of the last working version.

## Catalogs:

The store is divided into _catalogs_. Each catalog has a folder where the folder name is the `catalogId`. For instance, `/store/dce` would be the "dce" catalog.

Each catalog has its own folder within the `/store` folder. Inside that folder is a metadata file holding info on the catalog `/store/<catalogId>/metadata.json` in the form:

```json
{
    "title": "Catalog Title",
    "accounts": [25, 28],
    "tagsToShow": [
    {
      "name": "cost",
      "color": "blue",
    },
    {
      "name": "language",
      "color": "#FF7F50",
    },
    {
      "name": "semester"
    },
  ],
  "defaultSupportEmail": "example@harvard.edu"
}
```

^ this is an example metadata file. See the docs in the `/docs/types` folder for more info.

#### Accounts

The accounts property inside the catalog metadata is a list of Canvas accountIds. When a user launches the app store from a course within an account that's included in the above list of accounts, the above catalog will be shown to that user. In the case where a course has been merged, the parent account is the one we will use for this process (when you merge Canvas courses, you choose one course that will be merged _into_ the other, the parent. The parent course's account will be the one we use for the catalog determining process).

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

### The attributes related to the app install process

The attribute "messageBeforeInstall" within the app's metadata file will be shown to users prior to installing an app. It may contain important information about the installing process or about the app itself. After viewing the message, users can choose to continue the install process or cancel. If in your app metadata, the "requestInstallEmail" attribute exists, the users will have to send an email to formally request installing the app. However, if the user is an administrator for the account, they can directly install the app, bypassing the requesting process even if "requestInstallEmail" appears in the app's metadata.

Upon successful installation, "messageAfterInstall" will be shown to instruct users on further actions.  "messageBeforeUninstall", "requestUninstallEmail", and "messageAfterUninstall" serve the same purpose when uninstalling an app. 

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

Each app must have an icon image stored at `/store/<catalogId>/<appId>/icon.png`. It will either be in a file `icon.png` or `icon.jpg`.

#### The app's folder structure
Under the app folder stored at `/store/<catalogId>/<appId>`: there should be a `metadata.json` file, `install.xml`, `icon.png` or `icon.jpg`, `credentials.json`, and a optional `screenshots` folder containing `png`, `jpg`, or `jpeg` image files in the case where you are not extending from another app. 

## Logic about the loading process

### Extends

The apps are designed such that they can be independent, having their own metadata files, or they can extend metadata files from another app, and overwrite properties based on the admin's choosing. For example, if you want to extend from the above app "SwipeIn 2", and change the creator, requestInstallEmail, requestUninstallEmail, and supportEmail to your own, you can write your metadata file as such (assuming "Swipein 2" is in the dce catalog, and its appId is swipein2):

```json
{
    "extends": {
        "catalogId": "dce",
        "appId": "swipein2"
    },
    "creator": ["pe", "dce"],
    "supportEmail": "the_changed_support_email@harvard.edu",
    "requestInstallEmail": "instructionaltechnology_changed@dce.harvard.edu",
    "requestUninstallEmail": "instructionaltechnology_changed@dce.harvard.edu"
}
```

**Note:** If your app is extending the screenshots or icon from another app, you do not need to copy the screenshots image files and paste them under your own `/screenshots` folder. We will take them from their original position, and load and serve them to your app. If you are planning to use your own set of screenshots and icon, please list them in the `metadata.json` as well as including the physical files.