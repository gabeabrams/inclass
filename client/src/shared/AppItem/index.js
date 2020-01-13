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
      onClick,
    } = this.props;

    // Deconstruct the app
    const {
      title,
      subtitle,
      creator,
      tags,
      icon,
      appId,
    } = app;

    const iconURL = `https://${path.join(storeHost, icon.url)}`;
    const className = `alert alert-${dark ? 'secondary' : 'light'} ${dark ? 'appitem-box ' : ''}text-dark p-2`;
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        className={className}
        onClick={dark ? () => { onClick(app.appId); } : undefined}
        style={{
          cursor: (dark ? 'pointer' : undefined),
        }}
        id={`${appId}-appItem`}
      >
        {/* contains the whole appItem */}
        <div className="appitem-container">
          <AppIcon appTitle={title} iconURL={iconURL} />
          {/* contains app title, subtitle, creator, and tags */}
          <div className="appitem-right-container">
            {/* contains app title and creator */}
            <div className="appitem-title-and-creator-container">
              <AppTitle
                title={title}
                dark={dark}
                onClick={dark ? onClick : undefined}
                appId={app.appId}
              />
              {/* if class is dark, creator is light. and vice versa */}
              <div className="d-none d-sm-block">
                {/* if app item is dark, creator is light. and vice versa */}
                <AppCreatorTag
                  creator={creator}
                  dark={dark ? undefined : true}
                />
              </div>
            </div>
            <AppSubtitle subtitle={subtitle} />
            <div className="d-none d-sm-block">
              <AppTags
                tags={tags}
                tagColors={tagColors}
              />
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
  // function that executes when clicking app Item
  onClick: PropTypes.func,
};

AppItem.defaultProps = {
  // default is to render the appItem in a light theme
  dark: false,
  // default for onClick is null, in which app Item is not interactable
  onClick: undefined,
};

export default AppItem;
