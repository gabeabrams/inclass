// Import caccl
import initCACCL from 'caccl/client/cached';

// Import React
import React, { Component } from 'react';

// Import other components
import Header from './Header';
import Body from './Body';
import Screenshots from './Body/AppPage/AppPageContent/TabBox/Screenshots'

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
      currentBodyType: BODY_TYPE.APP_PAGE,
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
        installing: false,
      },
    };
  }

  /**
   * Called when the component mounted, pulls state and user profile from server
   */
  async componentDidMount() {
    /* ---------------------- Load Server State --------------------- */
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

  /**
   * Render the AppStore
   */
  render() {
    // Deconstruct the state
    const {
      supportModalStatus,
      storeHost,
      storeTitle,
      catalogTitle,
      currentBodyType,
      loadingMessage,
      fatalErrorMessage,
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
    let supportModelElement;
    if (supportModalStatus.open) {
      const { email, subject } = supportModalStatus;
      supportModelElement = (
        <span email={email} subject={subject} onClose={() => {}}>
          No Support Modal Yet!
        </span>
      );
    }

    // Render the component

    const { allApps } = this.state;
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
            storeHost={storeHost}
            currentBodyType={currentBodyType}
            appList={allApps}
          />
        </div>
        {supportModelElement}
      </div>
    );
  }
}

export default AppStore;
