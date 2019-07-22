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
      currentTab: TAB_NAMES.SCREENSHOTS,
    };

    this.tabChanged = this.tabChanged.bind(this);
  }

  tabChanged(newTabName) {
    this.setState({
      currentTab: newTabName,
    });
  }

  render() {
    const { app } = this.props;
    const { currentTab } = this.state;
    return (
      <div className="appPageContent-container">
        <TabBar
          onClick={() => {
            this.tabChanged(TAB_NAMES.SCREENSHOTS);
          }}
          screenshotsActive
        />
        <Screenshots app={app} />
      </div>
    );
    // }
    // TODO: show the current tab box (screenshots, guides, or info)
    // TODO: pass this.tabChanged to the tab bar so it can call it when a new tab is selected
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
};

export default AppPageContent;
