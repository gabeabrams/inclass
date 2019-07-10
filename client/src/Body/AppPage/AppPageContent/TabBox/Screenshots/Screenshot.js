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
    console.log('Real URL: ', url);
    const fakeURL = `https://localhost${url}`;
    console.log('FakeURL: ', fakeURL);
    return (
      <div className="card-deck">
        <div className="card border-dark mb-3">
          <img className="card-img-top" src={fakeURL} alt='App Screenshot' />
          <div className="card-body">
            <h5 className="card-title border-dark mb-3">{title}</h5>
          </div>
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
