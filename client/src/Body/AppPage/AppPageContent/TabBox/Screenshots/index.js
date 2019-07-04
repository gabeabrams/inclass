// props:
// - app (the app to show the screenshots of)

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
// Questions to answer: How to get the app to show the screenshots of?
import Screenshot from './Screenshot';


class Screenshots extends Component {
  render() {
    getScreenshots = () => {
      const { screenshots } = this.props.app;
      screenshots.forEach( (screenshot) => {
        const { title, filename } = screenshot;
              <div> 
                <Screenshot src={filename} {title} />
              </div>
      });
    }
    return (
      <div>
          
      </div>
    );
  }
}
Screenshots.propTypes = {
  app: PropTypes.node.isRequired,
};

export default Screenshots;
