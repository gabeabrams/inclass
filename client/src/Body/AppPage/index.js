import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppPageFooter from './AppPageFooter';
import AppPageContent from './AppPageContent';

class AppPage extends Component {
  render() {
    // Deconstruct props
    const { app } = this.props;
    return (
      <div className="appPage-container">
        <div className="appPage-content">
          <AppPageContent app={app} />
        </div>
        <div className="appPage-footer">
          {/* TODO: Pass in the functions for the AppPageFooter */}
          <AppPageFooter />
        </div>
      </div>
    );
  }
}

AppPage.propTypes = {
  // The app to display
  app: PropTypes.shape({
    // Array of screenshots in the app
    screenshots: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default AppPage;
