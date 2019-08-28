import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TabBox from '.';

/**
 * Displays the description of the app
 *  or "No Description Provided" by default
 */
class Info extends Component {
  render() {
    const { description } = this.props;
    return (
      <div className="info-container">
        <TabBox>
          <p>{description}</p>
        </TabBox>
      </div>
    );
  }
}

Info.propTypes = {
  description: PropTypes.string,
};

Info.defaultProps = {
  // Description for the info page
  description: 'No Description Provided',
};

export default Info;
