// props:
// - screenshot: { title, url }
// Pass in a screenshot instead

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Screenshot extends Component {
  render() {
    // Deconstruct props
    const { screenshot } = this.props;
    const { title, url } = screenshot;
    return (
      <div className="card">
        <img className="card-img-top" src={url} alt="Screenshot" />
        <div className="card-body">
          <p className="card-text">{title}</p>
        </div>
      </div>
    );
  }
}

Screenshot.propTypes = {
  screenshot: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Screenshot;
