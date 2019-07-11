import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppPageFooter from './AppPageFooter';
import AppPageContent from './AppPageContent';

class AppPage extends Component {
  render() {
    const { app } = this.props;
    return (
      <div>
        <AppPageContent app={app} />
        <AppPageFooter />
      </div>
    );
  }
}

AppPage.propTypes = {
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

export default AppPage;
