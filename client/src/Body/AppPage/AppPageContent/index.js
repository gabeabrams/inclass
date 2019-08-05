import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import Screenshots from './TabBox/Screenshots';
import Guides from './TabBox/Guides';
import Info from './TabBox/Info';

// Names of tabs
import TAB_NAMES from './TAB_NAMES';
import TabBar from './TabBar';

class AppPageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // the tab that is displayed
      currentTab: TAB_NAMES.SCREENSHOTS,
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

    // Changes display based on tabs
    let contentToDisplay;
    if (currentTab === TAB_NAMES.INFO) {
      contentToDisplay = (
        <Info />
      );
    } else if (currentTab === TAB_NAMES.GUIDES) {
      contentToDisplay = (
        <Guides />
      );
    } else {
      contentToDisplay = (
        <Screenshots app={app} />
      );
    }
    return (
      <div className="appPageContent-container p-2">
        <TabBar
          currentTab={currentTab}
          onTabChanged={this.tabChanged}
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
  }).isRequired,

  // The host for the URL
  storeHost: PropTypes.string.isRequired,
};

export default AppPageContent;
