import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

import InstallButton from './InstallButton';
import UninstallButton from './UninstallButton';
import SupportButton from './SupportButton';

class AppPageFooter extends Component {
  render() {
    return (
      // Flexbox container for the entire footer with two buttons
      <div className="apppagefooter-background">
        <div className="apppagefooter-button">
          <SupportButton />
        </div>
        <div className="apppagefooter-button">
          <InstallButton />
        </div>

      </div>
    );
  }
}

export default AppPageFooter;
