import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import stylesheet
import './style.css';

// Import other components
import Screenshot from './Screenshot';
import TabBox from '..';
class Screenshots extends Component {
  render() {
    // get screenshots from the app
    const { app } = this.props;
    const { screenshots } = app;
    const toRender = screenshots.map((screenshot) => {
      return (
        <div
          className="screenshots-elem p-3 mw-20"
          key={screenshot.title}
          id={screenshot.filename}
        >
          <Screenshot screenshot={screenshot} />
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
