import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Markdown renderer
import Markdown from 'markdown-to-jsx';

// Import local components
import TabBox from '.';

// Import util
import placementToText from '../../../../utils/placementToText';

/**
 * Displays the description of the app
 *   or "No Description Provided" by default
 */
class Info extends Component {
  render() {
    const { description, requestInstallEmail, placement } = this.props;

    return (
      <div className="info-container">
        <TabBox>
          <div className="mt-2">
            <p className="lead font-weight-bold m-0">
              Description:
            </p>
            <Markdown>
              {description}
            </Markdown>

            <p className="lead font-weight-bold mb-0 mt-2">
              Availability:
            </p>
            <p>
              {
                requestInstallEmail
                  ? 'Request only. Click install for more info on how to send an installation request.'
                  : 'One-click install: just click the install button.'
              }
            </p>

            <p className="lead font-weight-bold mb-0 mt-2">
              Placement:
            </p>
            <p>
              Find this app in your course&nbsp;
              <em>{placementToText(placement)}</em>
              .
            </p>
          </div>
        </TabBox>
      </div>
    );
  }
}

Info.propTypes = {
  // The placement list for this app
  placement: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Description for the info page
  description: PropTypes.string,
  // Defined if the app requires an install request
  requestInstallEmail: PropTypes.string,
};

Info.defaultProps = {
  // By default, there is no description
  description: 'Unfortunately, we don\'t have a full description for this app. We\'re sorry!',
  // By default, the app has no requestInstallEmail
  requestInstallEmail: null,
};

export default Info;
