// props:
// - screenshot: { title, url }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Screenshot extends Component {
  render() {
    // Deconstruct props
    const { title, url } = this.props;
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
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Screenshot;
