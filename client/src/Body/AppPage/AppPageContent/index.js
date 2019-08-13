import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import Screenshots from './TabBox/Screenshots';
import Info from './TabBox/Info';

// TODO: Confused why this needs to have index to recognize it
import Guides from './TabBox/Guides/index';

// Names of tabs
import TAB_NAMES from './TAB_NAMES';
import TabBar from './TabBar';

class AppPageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // the tab that is displayed
      currentTab: TAB_NAMES.INFO,
    };

    this.tabChanged = this.tabChanged.bind(this);
  }

  // Changes the current tab to what is passed in
  tabChanged(newTabName) {
    this.setState({
      currentTab: newTabName,
    });
  }


  render() {
    // Deconstruct props
    const { app, storeHost } = this.props;
    // Deconstruct state
    const { currentTab } = this.state;

    let screenshotsExist = false;
    let guidesExist = false;

    if (app.screenshots) {
      screenshotsExist = true;
    }

    if (app.guides) {
      guidesExist = true;
    }

    // Changes display based on tabs
    let contentToDisplay;
    if (currentTab === TAB_NAMES.INFO) {
      contentToDisplay = (
        <Info description={app.description} />
      );
    } else if (currentTab === TAB_NAMES.GUIDES) {
      contentToDisplay = (
        <Guides app={app} />
      );
    } else {
      contentToDisplay = (
        <Screenshots app={app} storeHost={storeHost} />
      );
    }
    return (
      <div className="appPageContent-container p-2">
        <TabBar
          currentTab={currentTab}
          onTabChanged={this.tabChanged}
          screenshotsExist={screenshotsExist}
          guidesExist={guidesExist}
        />
        {contentToDisplay}
      </div>
    );
  }
}

AppPageContent.propTypes = {
  // The app to display
  app: PropTypes.shape({
    // Array of screenshots in the app (Note: what is currently needed)
    screenshots: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    // Array of guides
    guides: PropTypes.arrayOf(
      PropTypes.shape({
        // a string for the title of the guide
        title: PropTypes.string.isRequired,
        // array of strings to iterate the steps for each guide
        steps: PropTypes.arrayOf(
          PropTypes.string.isRequired
        ),
      })
    ),
  }).isRequired,


  // The host for the URL
  storeHost: PropTypes.string.isRequired,
};

export default AppPageContent;
