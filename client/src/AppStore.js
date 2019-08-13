// Import caccl
import initCACCL from 'caccl/client/cached';

// Import React
import React, { Component } from 'react';

// Import other components
import Header from './Header';
import Body from './Body';

import SupportModal from './Modal/SupportModal';
import InstallOrUninstallModal from './Modal/InstallOrUninstallModal';

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
      // Loading message (null if not loading)
      loadingMessage: 'Loading! Just a moment...',
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
        open: true,
        uninstalling: true,
      },
    };
    this.onSupportModalClose = this.onSupportModalClose.bind(this);
    this.onInstallOrUninstallModalClose = (
      this.onInstallOrUninstallModalClose.bind(this)
    );
    this.showSupportModal = (
      this.showSupportModal.bind(this)
    );
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
          loadingMessage: null,
          fatalErrorMessage: 'Please launch this app from Canvas.',
        });
      }

      // > AppStore is not authorized
      if (!status.authorized) {
        return this.setState({
          loadingMessage: null,
          fatalErrorMessage: 'We don\'t have access to Canvas. Please re-launch the app.',
        });
      }

      // > Get courseId from launchInfo
      ({ courseId } = status.launchInfo);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return this.setState({
        loadingMessage: null,
        fatalErrorMessage: 'We couldn\'t contact the app store server. Please make sure your internet connection is stable. If this issue continues to occur, contact an admin.',
      });
    }

    /* ------------------------ Load Metadata ----------------------- */
    try {
      const [storeRes, catalogRes] = await Promise.all([
        sendRequest({ path: '/store' }),
        sendRequest({ path: '/catalog' }),
      ]);

      // Process store metadata
      if (!storeRes.body.success) {
        return this.setState({
          loadingMessage: null,
          fatalErrorMessage: `We couldn't get info on the current app store due to an error: ${storeRes.body.message}`,
        });
      }
      const storeMetadata = storeRes.body.store;
      const storeHost = storeRes.body.host;

      // Process catalog metadata
      if (!catalogRes.body.success) {
        return this.setState({
          loadingMessage: null,
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
        loadingMessage: null,
        storeTitle: storeMetadata.title,
        catalogTitle: catalog.title,
        allApps: catalog.apps,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return this.setState({
        loadingMessage: null,
        fatalErrorMessage: 'We couldn\'t contact the app store server. Please make sure your internet connection is stable. If this issue continues to occur, contact an admin.',
      });
    }
  }

  onSupportModalClose() {
    const newsupportModalStatus = {
      open: false,
      email: '',
      subject: '',
    };
    this.setState({
      supportModalStatus: newsupportModalStatus,
    });
  }

  onInstallOrUninstallModalClose() {
    // How do I handle whether it is installing or uninstalling?????????
    const newInstallOrUninstallModalStatus = {
      open: false,
      installing: false,
    };
    this.setState({
      installOrUninstallModalStatus: newInstallOrUninstallModalStatus,
    });
  }

  showSupportModal(email, subject) {
    const newsupportModalStatus = {
      email,
      subject,
      open: true,
    };
    this.setState({
      supportModalStatus: newsupportModalStatus,
    });
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
      loadingMessage,
      fatalErrorMessage,
      installOrUninstallModalStatus,
      courseId,
    } = this.state;

    // Show loading message
    if (loadingMessage) {
      return (
        <div className="alert alert-info m-5 text-center">
          <h3>Loading...</h3>
          {loadingMessage}
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
      // FIX THIS LATER TO USE REAL EMAIL AND SUBJECT!!
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
      const fakeCurrenctSpecificApp = {
        title: 'GradeUp',
        messageBeforeInstall: 'this is message before install',
        messageAfterInstall: 'you have installed this app',
        messageBeforeUninstall: 'this is message before uninstall',
        messageAfterUninstall: 'you have uninstalled this app',
        supportEmail: 'harvardSupport@harvard.edu',
        // requestInstallEmail: 'requestInstall@harvard.edu',
        // requestUninstallEmail: 'requestUninstall@harvard.edu',
      };
      installModalElement = (
        <InstallOrUninstallModal
          currentSpecificApp={fakeCurrenctSpecificApp}
          catalog={catalogTitle}
          onClose={(this.onInstallOrUninstallModalClose)}
          showSupportModal={this.showSupportModal}
          uninstalling={uninstalling}
          courseId={courseId}
        />
      );
    }

    // Render the component
    return (
      <div>
        <div className="appstore-header-container">
          <Header
            storeHost={storeHost}
            storeTitle={storeTitle}
            catalogTitle={catalogTitle}
          />
        </div>
        <div className="appstore-body-container">
          <Body
            apps={allApps}
            tags={tags}
            storeHost={storeHost}
            currentBodyType={currentBodyType}
            currentSpecificApp={currentSpecificApp}
            appList={allApps}
          />
        </div>
        {supportModalElement}
        {installModalElement}
      </div>
    );
  }
}

export default AppStore;
