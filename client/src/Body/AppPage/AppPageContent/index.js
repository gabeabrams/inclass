import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import TabBox from './TabBox';

class AppPageContent extends Component {
  render() {
    const { app } = this.props;
    return (
      <div>
        <TabBox app={app} />
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
