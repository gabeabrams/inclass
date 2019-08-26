import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppTitle.css';

class AppTitle extends Component {
  render() {
    // deconstruct props
    const {
      title,
      dark,
      onClick,
      appId,
    } = this.props;

    // if dark, make app title into button
    if (dark) {
      // if onClick is undefined, then make button disabled
      const className = `btn btn-secondary ${onClick ? '' : 'disabled'} text-dark app-title pl-0 border-0`;

      return (
        <button
          type="button"
          className={className}
          id={`${appId}-app-title`}
          onClick={() => { onClick(appId); }}
          style={{
            backgroundColor: 'transparent',
          }}
          id={`${appId}-button`}
        >
          <h3 className="app-title-h3">
            {title}
          </h3>
        </button>
      );
    }
    // if not dark, title is not a button
    return (
      <div className="app-title">
        <h3>
          {title}
        </h3>
      </div>
    );
  }
}

AppTitle.propTypes = {
  // the title of the app
  title: PropTypes.string.isRequired,
  // the appId of the app
  appId: PropTypes.string.isRequired,
  // whether the app is shown as dark background
  dark: PropTypes.bool,
  // function that executes when clicking app title
  onClick: PropTypes.func,
};

AppTitle.defaultProps = {
  // default is to render the appItem in a light theme
  dark: undefined,
  // default for onClick is null, in which app title is not interactable
  onClick: undefined,
};

export default AppTitle;
