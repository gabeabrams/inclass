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
      <div className="apppagefooter-background">
        <div className="apppagefooter-button">
          <SupportButton handleClick={this.clickedSupport} />
        </div>
        <div className="apppagefooter-button">
          <InstallButton handleClick={this.clickedInstall} />
        </div>

      </div>
    );
  }
}

export default AppPageFooter;
