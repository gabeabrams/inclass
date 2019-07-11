// props:
// - screenshot: { title, url }
// Pass in a screenshot instead

import React, { Component } from 'react';

import './Screenshot.css';

import PropTypes from 'prop-types';

class Screenshot extends Component {
  render() {
    // Deconstruct props
    const { screenshot } = this.props;
    const { title, url } = screenshot;
    const fakeURL = `https://localhost${url}`;
    return (
      <div className="card-deck">
        <div className="card border-dark mb-3">
        <div className="card-header bg-secondary text-light">
            <h5 className="card-title mb-0">{title}</h5>
          </div>
          <img className="card-img-top" src={fakeURL} alt='App Screenshot' />
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
