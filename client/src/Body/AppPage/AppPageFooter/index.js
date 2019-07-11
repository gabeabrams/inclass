import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

import InstallButton from './InstallButton';
import UninstallButton from './UninstallButton';
import SupportButton from './SupportButton';

class AppPageFooter extends Component {
  clickedInstall = () => {
    console.log('clicked Install button');
  }

  clickedSupport = () => {
    console.log('clicked Support button');
  }
  render() {
    return (
      // Flexbox container for the entire footer with two buttons
      <div className="apppagefooter-container">
        <div className="apppagefooter-button">
          <SupportButton onClick={this.clickedSupport} />
        </div>
        <div className="apppagefooter-button">
          <InstallButton onClick={this.clickedInstall} />
        </div>

      </div>
    );
  }
}

export default AppPageFooter;
