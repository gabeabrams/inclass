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
    this.attemptInstallOrUninstall = this.attemptInstallOrUninstall.bind(this);
  }

  async componentDidMount() {
    // deconstruct the props
    const { currentSpecificApp, uninstalling } = this.props;
    const {
      messageBeforeInstall,
      messageBeforeUninstall,
    } = currentSpecificApp;
    const messageBefore = (
      (uninstalling)
        ? messageBeforeInstall
        : messageBeforeUninstall
    );
    if (messageBefore) {
      this.setState({
        currentView: CURRENT_VIEWS.SHOW_MESSAGE_BEFORE,
      });
    } else {
      await this.attemptInstallOrUninstall();
    }
  }

  /**
   * Called immediately if there is no message before, or called when user
   *   clicks "Install" or "Uninstall" in the messageBefore page
   */
  async attemptInstallOrUninstall() {
    // deconstruct the props
    const { currentSpecificApp, uninstalling } = this.props;
    const {
      requestInstallEmail,
      requestUninstallEmail,
    } = currentSpecificApp;

    const requestEmail = (
      (uninstalling)
        ? requestUninstallEmail
        : requestInstallEmail
    );
    // if the app needs permission to install or uninstall
    if (requestEmail) {
      this.setState({
        currentView: CURRENT_VIEWS.SHOW_REQUEST_VIA_EMAIL,
      });
    } else {
      const success = false;
      if (success) {
        // install/uninstall successful, set the state
        this.setState({
          currentView: CURRENT_VIEWS.SHOW_SUCCESS,
        });
      } else {
        // install/uninstall failed, set the state
        this.setState({
          currentView: CURRENT_VIEWS.SHOW_FAILURE,
        });
      }
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
      uninstalling,
      catalog,
      showSupportModal,
      courseId,
    } = this.props;
    // deconstruct current specific app
    const {
      title,
      messageBeforeInstall,
      messageAfterInstall,
      messageBeforeUninstall,
      messageAfterUninstall,
      requestInstallEmail,
      requestUninstallEmail,
      supportEmail,
    } = currentSpecificApp;

    let viewToDisplay;
    // decide based on currentView which modal to render
    switch (currentView) {
      case 'show-message-before':
        viewToDisplay = (
          <MessageBefore
            onClose={onClose}
            onClick={this.attemptInstallOrUninstall}
            message={
              (uninstalling)
                ? messageBeforeUninstall
                : messageBeforeInstall
            }
            uninstalling={uninstalling}
          />
        );
        break;
      case 'show-install-success':
        viewToDisplay = (
          <InstallOrUninstallSuccess
            onClose={onClose}
            appName={title}
            message={
              (uninstalling)
                ? messageAfterUninstall
                : messageAfterInstall
            }
            uninstalling={uninstalling}
          />
        );
        break;
      case 'show-install-failure':
        viewToDisplay = (
          <InstallOrUninstallFailure
            message="this failed"
            onClose={onClose}
            onSupportButtonClicked={() => {
              onClose();
              // TODO: add in the real failure message
              const subject = `I got an error while ${uninstalling ? ('uninstalling') : ('installing')} ${title} in course ${courseId}: replace this after`;
              showSupportModal(supportEmail, subject);
            }}
            uninstalling={uninstalling}
          />
        );
        break;
      case 'show-request-via-email':
        viewToDisplay = (
          <RequestInstallOrUninstall
            address={
              (uninstalling)
                ? requestUninstallEmail
                : requestInstallEmail
            }
            catalog={catalog}
            appName={title}
            onClose={onClose}
            uninstalling={uninstalling}
          />
        );
        break;
      default:
        viewToDisplay = null;
    }
    // pass handler functions to children modals to change the current view
    return (
      <div className="displayed-modal-container">
        { viewToDisplay }
      </div>
    );
  }
}

InstallOrUninstallModal.propTypes = {
  /* the current app to install or uninstall */
  currentSpecificApp: PropTypes.objectOf(PropTypes.string).isRequired,
  /* boolean to determine whether to show install or uninstall process */
  uninstalling: PropTypes.bool,
  /* function that closes the whole modal */
  onClose: PropTypes.func.isRequired,
  /* the catalog the app is in */
  catalog: PropTypes.string.isRequired,
  /* function that shows the support modal */
  showSupportModal: PropTypes.func.isRequired,
  /* courseId for the app */
  courseId: PropTypes.number.isRequired,
};

InstallOrUninstallModal.defaultProps = {
  /* Assume display installing */
  uninstalling: false,
};

export default InstallOrUninstallModal;
