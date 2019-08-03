// Import React
import React, { Component } from 'react';

const CURRENT_VIEWS = {
  SHOW_MESSAGE_BEFORE: 'show-message-before',
  SHOW_SUCCESS: 'show-install-success',
  SHOW_FAILURE: 'show-install-failure',
  SHOW_REQUEST_VIA_EMAIL: 'show-request-via-email',
};

class InstallOrUninstallModal extends Component {
  constructor(props) {
    super(props);

    // Bind the handlers
    this.attemptInstall = this.attemptInstall.bind(this);
  }

  async componentDidMount() {
    const { currentSpecificApp } = this.props;

    if (messageBefore exists) {
      this.state = {
        currentView: CURRENT_VIEWS.SHOW_MESSAGE_BEFORE,
      };
    } else {
      await this.attemptInstall();
    }
  }

  /**
   * Called immediately if there is no message before, or called when user
   *   clicks "Install" or "Uninstall" in the messageBefore page
   */
  async attemptInstall() {
    // TODO: try to install (for now, just skip this and hardcode whether if succeeds or fails)
    if (success) {
      // TODO: set the state
    } else {
      // TODO: set the state
    }
  }

  /**
   * Render the InstallOrUninstallModal
   */
  render() {
    // TODO: decide based on currentView which modal to render
    // TODO: pass handler functions to children modals that will change the current view
  }
}

export default InstallOrUninstallModal;