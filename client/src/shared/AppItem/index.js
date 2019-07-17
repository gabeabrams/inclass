import React, { Component } from 'react';
import PropTypes from 'prop-types';

import path from 'path';

// Import other components
import AppCreatorTag from './AppCreatorTag';
import AppIcon from './AppIcon';
import AppTitle from './AppTitle';
import AppSubtitle from './AppSubtitle';
import AppTags from './AppTags';

// Import stylesheet
import './style.css';

class AppItem extends Component {
  render() {
    // deconstruct props object
    const {
      app,
      tagColors,
      storeHost,
      dark,
    } = this.props;

    // Deconstruct the app
    const {
      title,
      subtitle,
      creator,
      tags,
      icon,
    } = app;

    const iconURL = `https://${path.join(storeHost, icon.url)}`;
    const className = `alert alert-${dark ? 'secondary' : 'light'} text-dark pr-3 pl-3 pt-2 pb-2`;

    // TODO: add some comments in the jsx
    return (
      <div className={className}>
        <div className="appitem-container">
          <AppIcon appTitle={title} iconURL={iconURL} />
          <div className="appitem-right-container">
            <div className="appitem-title-and-creator-container">
              <AppTitle title={title} />
              {/* if class is dark, creator is light. and vice versa */}
              <div className="d-none d-sm-block">
                <AppCreatorTag
                  creator={creator}
                  dark={dark ? undefined : true}
                />
              </div>
            </div>
            <AppSubtitle subtitle={subtitle} />
            <div className="d-none d-sm-block">
              <AppTags tags={tags} tagColors={tagColors} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AppItem.propTypes = {
  // the app to show
  app: PropTypes.objectOf(PropTypes.any).isRequired,
  // the tagColors
  tagColors: PropTypes.objectOf(PropTypes.object).isRequired,
  // the hostname of the store server
  storeHost: PropTypes.string.isRequired,
  // whether the app is shown as dark background
  dark: PropTypes.bool,
};

AppItem.defaultProps = {
  // TODO: comment to explain default
  dark: false,
};

export default AppItem;
