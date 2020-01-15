// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

// Import local components
import Modal from '..';
import OkayButton from '../../shared/OkayButton';
import MessageBody from './MessageBody';

// Import utils
import placementToText from '../../utils/placementToText';

// Import styles
import './InstallOrUninstallSuccess.css';

class InstallOrUninstallSuccess extends Component {
  /**
   * Render the Modal
   */
  render() {
    // deconstruct the props
    const {
      appName,
      message,
      onClose,
      placement,
      uninstalling,
    } = this.props;

    // Create a message
    let messageElem;
    if (message) {
      messageElem = (
        <div className="alert alert-warning">
          <p className="font-weight-bold lead text-center m-0">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="mr-2"
            />
            {message}
          </p>
        </div>
      );
    }

    // Create reload message
    const reloadMessage = (
      uninstalling
        ? (
          <p className="lead">
            Refresh Canvas and this app will be gone from your course
            <span>
              &nbsp;
              {placementToText(placement)}
            </span>
            .
          </p>
        )
        : (
          <p className="lead">
            Refresh Canvas and this app will appear in your course
            <span>
              &nbsp;
              {placementToText(placement)}
            </span>
            .
          </p>
        )
    );

    return (
      <div className="install-or-uninstall-success-modal">
        <Modal
          title={`${appName} ${(uninstalling) ? 'Uninstalled' : 'Installed'}!`}
          onClose={onClose}
          noX
        >
          {/* Checkmark */}
          <div className="text-center">
            <div className="InstallOrUninstallSuccess-checkmark">
              <FontAwesomeIcon
                icon={faCheck}
                className="InstallOrUninstallSuccess-checkmark-icon text-success"
              />
            </div>
          </div>
          {/* MessageBody has a default value of 'refresh canvas page' */}
          <div className="InstallOrUninstallSuccess-other-content">
            <MessageBody>
              {messageElem}
              {reloadMessage}
            </MessageBody>
            <div className="mt-2 text-right">
              <OkayButton
                onClick={onClose}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

InstallOrUninstallSuccess.propTypes = {
  /* Function to call when the modal is closed */
  onClose: PropTypes.func.isRequired,
  /* Message to display in the messageBody */
  message: PropTypes.string,
  /* App name to display in modal title */
  appName: PropTypes.string.isRequired,
  /* Install boolean to determine use for install or uninstalling */
  uninstalling: PropTypes.bool,
  // The list of placement locations for the app
  placement: PropTypes.arrayOf(PropTypes.string).isRequired,
};

InstallOrUninstallSuccess.defaultProps = {
  /* Assume display installing */
  uninstalling: false,
  /* Message to display in the messageBody */
  message: null,
};

export default InstallOrUninstallSuccess;
