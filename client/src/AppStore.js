// Import caccl
import initCACCL from 'caccl/client/cached';

// Import React
import React, { Component } from 'react';

// Import Helmet (for title overwriting)
import Helmet from 'react-helmet';

import Favicon from 'react-favicon';

// Import FontAwesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

// Import other components
import Header from './Header';
import Body from './Body';
import SupportModal from './Modal/SupportModal';
import InstallOrUninstallModal from './Modal/InstallOrUninstallModal';

// Import helpers
import filterByQuery from './utils/filter/filterByQuery';
import filterByTags from './utils/filter/filterByTags';
import writeLog from './utils/writeLog';

// Import body types
import BODY_TYPE from './Body/BODY_TYPE';

// Import css
import './AppStore.css';

// Initialize caccl
const {
  getStatus,
  sendRequest,
} = initCACCL();

class AppStore extends Component {
  /**
   * Initialize AppStore component
   */
  constructor(props) {
    super(props);

    // Set up state
    this.state = {
      // Loading (true if loading)
      loading: true,
      // Fatal error message (null if no fatal error)
      fatalErrorMessage: null,
      // Store title
      storeTitle: null,
      // Store host
      storeHost: null,
      // Catalog title
      catalogTitle: null,
      // Canvas Course ID
      courseId: null,
      // isAdmin (true if user is an admin)
      isAdmin: false,
      // Tags
      tags: {},
      // True if the filter drawer is open
      filterDrawerOpen: false,
      // Search query (the string in the search box)
      searchQuery: '',
      // The full list of apps (unfiltered)
      allApps: [],
      // The type of the current page body to show (see BODY_TYPE above)
      currentBodyType: BODY_TYPE.APP_LIST,
      // Current app
      currentSpecificApp: null,
      // Support modal status
      supportModalStatus: {
        open: false,
        email: '',
        subject: '',
      },
      // Status of the installOrUninstall modal
      installOrUninstallModalStatus: {
        open: false,
        uninstalling: false,
      },
      // Mapping of LTI Ids for installed apps
      ltiIdsMap: {}, // appId => list of lti ids if the app is installed
      // If true, an install or uninstall is currently in progress
      working: false,
    };

    // Bind handlers
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.onFilterToggle = this.onFilterToggle.bind(this);
    this.onFilterChanged = this.onFilterChanged.bind(this);
    this.onBackButtonClicked = this.onBackButtonClicked.bind(this);
    this.onSupportModalClose = this.onSupportModalClose.bind(this);
    this.onInstallOrUninstallModalClose = (
      this.onInstallOrUninstallModalClose.bind(this)
    );
    this.showSupportModal = this.showSupportModal.bind(this);
    this.installApp = this.installApp.bind(this);
    this.uninstallApp = this.uninstallApp.bind(this);
    this.onAppSelected = this.onAppSelected.bind(this);
    this.onInstallClicked = this.onInstallClicked.bind(this);
    this.onUninstallClicked = this.onUninstallClicked.bind(this);
    this.onSupportClicked = this.onSupportClicked.bind(this);
    this.onMouseOverList = this.onMouseOverList.bind(this);
  }

  /**
   * Called when the component mounted, pulls state and user profile from server
   */
  async componentDidMount() {
    /* ---------------------- Load Server State --------------------- */
    let courseId;
    try {
      // Get status from server
      const status = await getStatus();

      // > AppStore wasn't launched via Canvas
      if (!status.launched) {
        return this.setState({
          loading: false,
          fatalErrorMessage: 'Please launch this app from Canvas.',
        });
      }

      // > AppStore is not authorized
      if (!status.authorized) {
        return this.setState({
          loading: false,
          fatalErrorMessage: 'We don\'t have access to Canvas. Please re-launch the app.',
        });
      }

      // > Get courseId from launchInfo
      ({ courseId } = status.launchInfo);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return this.setState({
        loading: false,
        fatalErrorMessage: 'We couldn\'t contact the app store server. Please make sure your internet connection is stable. If this issue continues to occur, contact an admin.',
      });
    }

    /* ------------------------ Load Metadata ----------------------- */
    try {
      const [storeRes, catalogRes] = await Promise.all([
        sendRequest({ path: '/store' }),
        sendRequest({ path: '/catalog' }),
      ]);
      // loadLTIIds after catalog and store loads
      await this.loadLTIIds();
      // Process store metadata
      if (!storeRes.body.success) {
        return this.setState({
          loading: false,
          fatalErrorMessage: `We couldn't get info on the current app store due to an error: ${storeRes.body.message}`,
        });
      }
      const storeMetadata = storeRes.body.store;
      const storeHost = storeRes.body.host;

      // Process catalog metadata
      if (!catalogRes.body.success) {
        return this.setState({
          loading: false,
          fatalErrorMessage: `We couldn't get info on the app catalog for your course due to an error: ${catalogRes.body.message}`,
        });
      }
      const { catalog, isAdmin } = catalogRes.body;
      // Post-process store metadata, catalog, and add to state
      // > Tags
      const tags = {};
      catalog.tagsToShow.forEach((tag) => {
        // Extract basic tag information
        const { name, color } = tag;

        // Get tag values
        const allValues = new Set();
        Object.values(catalog.apps).forEach((app) => {
          (app.tags[name] || []).forEach((value) => {
            allValues.add(value);
          });
        });

        // Turn tag values into an isChecked mapping
        const values = {};
        allValues.forEach((value) => {
          values[value] = false; // Everything starts unchecked
        });

        // Save tag object
        tags[name] = {
          color,
          values,
        };
      });

      this.setState({
        courseId,
        storeHost,
        isAdmin,
        tags,
        loading: false,
        storeTitle: storeMetadata.title,
        catalogTitle: catalog.title,
        allApps: catalog.apps,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return this.setState({
        loading: false,
        fatalErrorMessage: 'We couldn\'t contact the app store server. Please make sure your internet connection is stable. If this issue continues to occur, contact an admin.',
      });
    }
  }

  /**
   * Function to call when the search bar query is updated
   * @param {string} newSearchQuery - the updated text in the search bar
   */
  onSearchChanged(newSearchQuery) {
    this.setState({
      searchQuery: newSearchQuery,
    });
  }

  /**
   * Set the support modal status open to false to hide the modal
   */
  onSupportModalClose() {
    const newSupportModalStatus = {
      open: false,
      email: '',
      subject: '',
    };
    this.setState({
      supportModalStatus: newSupportModalStatus,
    });
  }

  /**
   * Function to call when filter drawer is clicked
   * @param {boolean} newFilterDrawerOpen - the boolean passed from the button
   */
  onFilterToggle(newFilterDrawerOpen) {
    this.setState({
      filterDrawerOpen: !!newFilterDrawerOpen,
    });
  }

  /**
   * Set the install modal status open to false to hide the modal
   */
  onInstallOrUninstallModalClose() {
    const newInstallOrUninstallModalStatus = {
      open: false,
      uninstalling: true,
    };
    this.setState({
      installOrUninstallModalStatus: newInstallOrUninstallModalStatus,
      working: false,
    });
  }

  /**
   * Function to call when checkbox is clicked or when reset button is clicked
   * @param {boolean} isChecked - bool for new value of checkbox(es)
   * @param {string} tagName - name of the tag to update
   * @param {string} [tagValue] - optional value of the tag to be updated; if
   *   none, all tagValues are updated
   */
  onFilterChanged(isChecked, tagName, tagValue) {
    const {
      tags,
    } = this.state;

    const newTags = tags;

    const tagValuesToChange = (
      tagValue
        ? [tagValue]
        : Object.keys(newTags[tagName].values)
    );

    tagValuesToChange.forEach((tagValueToChange) => {
      newTags[tagName].values[tagValueToChange] = !!isChecked;
    });

    this.setState({
      tags: newTags,
    });
  }

  /**
   * Function called when mouse goes over the app list
   */
  onMouseOverList() {
    this.setState({
      filterDrawerOpen: false,
    });
  }

  /**
   * Moves the user back to the app list
   */
  onBackButtonClicked() {
    const newBodyType = BODY_TYPE.APP_LIST;
    this.setState({
      currentBodyType: newBodyType,
    });
  }

  /**
   * Handles when an app is clicked in the list
   * @param {string} appId - the id of the app that was clicked
   */
  onAppSelected(appId) {
    const { allApps } = this.state;

    this.setState({
      currentSpecificApp: allApps[appId],
      currentBodyType: BODY_TYPE.APP_PAGE,
      working: false,
    });
  }

  /**
   * Handles when the install button is clicked
   */
  onInstallClicked() {
    const newInstallOrUninstallModalStatus = {
      open: true,
      uninstalling: false,
    };

    this.setState({
      installOrUninstallModalStatus: newInstallOrUninstallModalStatus,
      working: true,
    });
  }

  /**
   * Handles when the uninstall button is clicked
   */
  onUninstallClicked() {
    const newInstallOrUninstallModalStatus = {
      open: true,
      uninstalling: true,
    };

    this.setState({
      installOrUninstallModalStatus: newInstallOrUninstallModalStatus,
      working: true,
    });
  }

  /**
   * Handles when the support button is clicked
   */
  onSupportClicked() {
    // Deconstruct state and state variables
    const { currentSpecificApp, courseId } = this.state;
    const {
      appId,
      supportEmail,
      title,
    } = currentSpecificApp;

    const subject = `I need support for ${title} in course ${courseId}`;
    this.showSupportModal(supportEmail, subject);

    // Log the event in the server
    writeLog(
      'support-clicked',
      {
        appId,
        supportEmail,
        appName: title,
      }
    );
  }

  /**
   * Set the support modal status to true to show the modal
   */
  showSupportModal(email, subject) {
    const newSupportModalStatus = {
      email,
      subject,
      open: true,
    };
    this.setState({
      supportModalStatus: newSupportModalStatus,
    });
  }

  /**
   * Load and process the LTI Ids from the server
   */
  async loadLTIIds() {
    let success;
    let message;
    let apps;
    try {
      const response = await sendRequest({ path: '/installed-apps' });
      ({ success, message, apps } = response.body);
    } catch (err) {
      throw new Error('We couldn\'t reach the server please check your internet connection');
    }

    if (!success) {
      throw new Error(message);
    }
    // Post-processing for LTIIds
    const ltiIdsMap = {};
    apps.forEach((app) => {
      ltiIdsMap[app.appId] = app.ltiIds;
    });

    this.setState({
      ltiIdsMap,
    });
  }

  /**
   * Attempts to install the current app. If it fails, throws an error.
   */
  async installApp() {
    const { currentSpecificApp } = this.state;
    const { appId } = currentSpecificApp;
    let success;
    let message;
    try {
      const response = await sendRequest({
        path: `/install/${appId}`,
        method: 'POST',
      });
      ({ success, message } = response.body);
    } catch (err) {
      throw new Error('We couldn\'t reach the server please check your internet connection');
    }
    if (!success) {
      throw new Error(message);
    }
    // if app is installed successfully, reload the ltiIds
    await this.loadLTIIds();
  }

  /**
   * Attempts to uninstall the current app. If it fails, throws an error.
   */
  async uninstallApp() {
    const { currentSpecificApp, ltiIdsMap } = this.state;
    const { appId, title } = currentSpecificApp;
    const ltiIds = ltiIdsMap[appId];
    if (!ltiIds || ltiIds.length === 0) {
      throw new Error(`${title} could not be uninstalled because it couldn't be found in your course`);
    }

    let success;
    let message;
    try {
      const response = await sendRequest({
        path: '/uninstall',
        method: 'POST',
        params: {
          appId,
          appName: title,
          ltiIds: JSON.stringify(ltiIds),
        },
      });
      ({ success, message } = response.body);
    } catch (err) {
      throw new Error('We couldn\'t reach the server please check your internet connection');
    }
    if (!success) {
      throw new Error(message);
    }

    // if app is uninstalled successfully, reload the ltiIds
    await this.loadLTIIds();
  }

  /**
   * Render the AppStore
   */
  render() {
    // Deconstruct the state
    const {
      allApps,
      tags,
      supportModalStatus,
      storeHost,
      storeTitle,
      catalogTitle,
      currentBodyType,
      currentSpecificApp,
      loading,
      fatalErrorMessage,
      filterDrawerOpen,
      searchQuery,
      installOrUninstallModalStatus,
      courseId,
      isAdmin,
      ltiIdsMap,
      working,
    } = this.state;

    // Show loading message
    if (loading) {
      return (
        <div
          className="loading-container text-center text-info p-3"
        >
          <FontAwesomeIcon
            icon={faCircleNotch}
            spin
            style={{
              animation: 'fa-spin 1s infinite linear',
            }}
          />
        </div>
      );
    }

    // Show fatal error
    if (fatalErrorMessage) {
      return (
        <div className="alert alert-warning m-5 text-center">
          <h3>Oops! An error occurred</h3>
          {fatalErrorMessage}
        </div>
      );
    }

    // Create supportModelElement if open
    let supportModalElement;
    if (supportModalStatus.open) {
      const { email, subject } = supportModalStatus;
      supportModalElement = (
        <SupportModal
          address={email}
          subject={subject}
          onClose={(this.onSupportModalClose)}
        />
      );
    }

    // Create Install/Uninstall Element if open
    let installModalElement;
    if (installOrUninstallModalStatus.open) {
      const { uninstalling } = installOrUninstallModalStatus;
      installModalElement = (
        <InstallOrUninstallModal
          isAdmin={isAdmin}
          currentSpecificApp={currentSpecificApp}
          catalog={catalogTitle}
          onClose={this.onInstallOrUninstallModalClose}
          showSupportModal={this.showSupportModal}
          uninstalling={uninstalling}
          courseId={courseId}
          installApp={this.installApp}
          uninstallApp={this.uninstallApp}
        />
      );
    }

    // Filter the apps
    const filteredAppsByTags = filterByTags(allApps, tags);
    const filteredApps = filterByQuery(filteredAppsByTags, searchQuery);

    // create isFiltering bool to pass into body
    const isFiltering = (
      Object.keys(allApps).length !== Object.keys(filteredApps).length
    );

    // Checks if the app is installed
    let isInstalled = false;
    if (currentSpecificApp) {
      const { appId } = currentSpecificApp;
      isInstalled = (!!ltiIdsMap[appId] && ltiIdsMap[appId].length > 0);
    }

    // Render the component
    return (
      <div>
        <Helmet>
          <title>
            {`${storeTitle} App Store | ${catalogTitle} Catalog`}
          </title>
        </Helmet>
        <Favicon
          url={`https://${storeHost}/public/logo`}
        />
        <div className="appstore-header-container">
          <Header
            storeHost={storeHost}
            storeTitle={storeTitle}
            catalogTitle={catalogTitle}
            filterDrawerOpen={filterDrawerOpen}
            onFilterToggle={this.onFilterToggle}
            searchQuery={searchQuery}
            onSearchChanged={this.onSearchChanged}
            tags={tags}
            apps={filteredApps}
            onFilterChanged={this.onFilterChanged}
            currentBodyType={currentBodyType}
            onBackButtonClicked={this.onBackButtonClicked}
          />
        </div>
        <div className="appstore-body-container" onMouseEnter={this.onMouseOverList}>
          <Body
            apps={filteredApps}
            tags={tags}
            storeHost={storeHost}
            currentBodyType={currentBodyType}
            currentSpecificApp={currentSpecificApp}
            appList={allApps}
            onAppSelected={this.onAppSelected}
            onInstallClicked={this.onInstallClicked}
            onUninstallClicked={this.onUninstallClicked}
            onSupportClicked={this.onSupportClicked}
            isFiltering={isFiltering}
            isInstalled={isInstalled}
            working={working}
          />
        </div>
        {supportModalElement}
        {installModalElement}
      </div>
    );
  }
}

export default AppStore;
