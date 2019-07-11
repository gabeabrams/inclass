import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import Screenshots from './TabBox/Screenshots';

// Names of tabs
import TAB_NAMES from './TAB_NAMES';

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
    // TODO: show the current tab box (screenshots, guides, or info)
    // TODO: pass this.tabChanged to the tab bar so it can call it when a new tab is selected
    return (
      <div className="appPageContent-container">
        <Screenshots app={app} />
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
};

export default AppPageContent;
