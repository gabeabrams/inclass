// props:
// - app (the app to show the screenshots of)

import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Import other components
import TabBox from '.';

class Guides extends Component {
  render() {
    return (
      <TabBox>
        <p>This is a placeholder for the Guides page</p>
      </TabBox>
    );
  }
}

Guides.propTypes = {

};

export default Guides;
