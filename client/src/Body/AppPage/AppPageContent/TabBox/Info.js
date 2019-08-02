// props:
// - app (the app to show the screenshots of)

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TabBox from '.';

// Import other components
// Questions to answer: How to get the app to show the screenshots of?

class Info extends Component {
  render() {
    return (
      <TabBox>
        <p>This is a placeholder for the Info page</p>
      </TabBox>
    );
  }
}

Info.propTypes = {

};

export default Info;
