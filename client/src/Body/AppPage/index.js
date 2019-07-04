import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppPageFooter from './AppPageFooter';
import AppPageContent from './AppPageContent';

class AppPage extends Component {
  render() {
    return (
      <div>
        <AppPageContent />
        <AppPageFooter />
      </div>
    );
  }
}

export default AppPage;
