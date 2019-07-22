import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import stylesheet
import './style.css';

// Import other components
import Screenshot from './Screenshot';

class Screenshots extends Component {
  render() {
    // get screenshots from the app
    const toRender = [];
    const { app, storeHost } = this.props;
    const { screenshots } = app;
    screenshots.forEach((screenshot) => {
      toRender.push(<div className="screenshots-elem"><Screenshot screenshot={screenshot} storeHost={storeHost} /></div>);
    });

    return (
      <div className="screenshots-container">
        {toRender}
      </div>
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
