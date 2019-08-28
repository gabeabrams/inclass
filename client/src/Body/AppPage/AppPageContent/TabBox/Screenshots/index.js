import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import stylesheet
import './style.css';

// Import other components
import Screenshot from './Screenshot';
import TabBox from '..';

/**
 * Renders the screenshot(s) from the app
 */
class Screenshots extends Component {
  render() {
    // deconstruct props
    const { app, storeHost } = this.props;
    const { screenshots } = app;
    // maps the screenshots with styling
    const toRender = screenshots.map((screenshot, index) => {
      return (
        <div key={screenshot.filename}>
          <div
            className="screenshots-elem p-3 mw-20"
          >
            <Screenshot
              screenshot={screenshot}
              index={index + 1}
              storeHost={storeHost}
            />
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
  // Host for the URL
  storeHost: PropTypes.string.isRequired,
};

export default Screenshots;
