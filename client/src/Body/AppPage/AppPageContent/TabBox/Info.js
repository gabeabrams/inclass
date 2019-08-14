// props:
// - app (the app to show the screenshots of)

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TabBox from '.';

// Import other components
// Questions to answer: How to get the app to show the screenshots of?

class Info extends Component {
  render() {
    const { description } = this.props;
    return (
      <TabBox>
        <p>{description}</p>
      </TabBox>
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
