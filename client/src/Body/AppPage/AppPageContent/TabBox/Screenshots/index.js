import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import stylesheet
import './style.css';

// Import other components
import Screenshot from './Screenshot';
import TabBox from '..';

class Screenshots extends Component {
  render() {
    // deconstruct props
    const { app } = this.props;
    const { screenshots } = app;
    // keeps track of number of screenshots for screenshot id
    let index = 0;
    // maps the screenshots with styling
    const toRender = screenshots.map((screenshot) => {
      index += 1;
      return (
        <div key={screenshot.filename}>
          <div
            className="screenshots-elem p-3 mw-20"
          >
            <Screenshot screenshot={screenshot} index={index} />
          </div>
        </div>
      );
    });

    return (
      <TabBox>
        <div className="screenshots-container">
          {toRender}
        </div>
      </TabBox>
    );
  }
}

Screenshots.propTypes = {
  // The app whose screenshots we want
  app: PropTypes.shape({
    // Array of screenshots in the app
    screenshots: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default Screenshots;
