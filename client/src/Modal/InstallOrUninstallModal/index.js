// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import different modals to display
import MessageBefore from './MessageBefore';
import InstallOrUninstallSuccess from './InstallOrUninstallSuccess';
import InstallOrUninstallFailure from './InstallOrUninstallFailure';
import RequestInstallOrUninstall from './RequestInstallOrUninstall';

const CURRENT_VIEWS = {
  SHOW_MESSAGE_BEFORE: 'show-message-before',
  SHOW_SUCCESS: 'show-install-success',
  SHOW_FAILURE: 'show-install-failure',
  SHOW_REQUEST_VIA_EMAIL: 'show-request-via-email',
};

class InstallOrUninstallModal extends Component {
  constructor(props) {
    super(props);

    // current view that tracks which modal we are displaying, default to null
    this.state = {
      currentView: null,
    };
    // Bind the handlers
    this.attemptInstall = this.attemptInstall.bind(this);
  }

  async componentDidMount() {
    // deconstruct the props
    const { currentSpecificApp, onClose, uninstall } = this.props;
    const {
      title,
      messageBeforeInstall,
      messageAfterInstall,
      messageBeforeUninstall,
      messageAfterUninstall,
      supportEmail,
      requestInstallEmail,
      requestUninstallEmail,
    } = currentSpecificApp;
    if (messageBeforeInstall) {
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
    const success = true;
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
    // deconstruct the state
    const { currentView } = this.state;
    // deconstruct the props
    const {
      currentSpecificApp,
      onClose,
      uninstall,
      catalog,
    } = this.props;
    // deconstruct current specific app
    const {
      title,
      messageBeforeInstall,
      messageAfterInstall,
      messageBeforeUninstall,
      messageAfterUninstall,
      supportEmail,
      requestInstallEmail,
      requestUninstallEmail,
    } = currentSpecificApp;

    let viewToDisplay;
    // decide based on currentView which modal to render
    switch (currentView) {
      case 'show-message-before':
        viewToDisplay = (
          <MessageBefore
            onClose={onClose}
            onClick={() => {}}
            message={messageBeforeInstall}
          />
        );
        break;
      case 'show-install-success':
        viewToDisplay = (
          <InstallOrUninstallSuccess
            onClose={onClose}
            appName={title}
            message={messageAfterInstall}
          />
        );
        break;
      case 'show-install-failure':
        viewToDisplay = (
          <InstallOrUninstallFailure
            message="this failed"
            onClose={onClose}
            onSupportButtonClicked={() => {}}
          />
        );
        break;
      case 'show-request-via-email':
        viewToDisplay = (
          <RequestInstallOrUninstall
            address={requestInstallEmail}
            catalog={catalog}
            appName={title}
            onClose={onClose}
          />
        );
        break;
      default:
        viewToDisplay = null;
    }
    // pass handler functions to children modals to change the current view
    return (
      { viewToDisplay }
    );
  }
}

InstallOrUninstallModal.propTypes = {
  /* the current app to install or uninstall */
  currentSpecificApp: PropTypes.objectOf(PropTypes.string).isRequired,
  /* boolean to determine whether to show install or uninstall process */
  uninstall: PropTypes.bool,
  /* function that closes the whole modal */
  onClose: PropTypes.func.isRequired,
  /* the catalog the app is in */
  catalog: PropTypes.string.isRequired,
};

InstallOrUninstallModal.defaultProps = {
  /* Assume display installing */
  uninstall: false,
};

export default InstallOrUninstallModal;
