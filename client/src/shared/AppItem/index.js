import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppListStatusBar from '../../Body/AppList/AppListStatusBar';
import AppCreatorTag from './AppCreatorTag';
import AppIcon from './AppIcon';
import AppTitle from './AppTitle';
import AppSubtitle from './AppSubtitle';
import AppTags from './AppTags';
import './index.css';

class AppItem extends Component {
  render() {
    // deconstruct props object
    const {
      opts: { creator },
      opts: { iconURL },
      opts: { title },
      opts: { subtitle },
      opts: { tags },
    } = this.props;

    return (
      <div className="app-item-container">
        <AppIcon iconURL={iconURL} />
        <div className="right-container">
          <div className="title-and-creator-container">
            <AppTitle title={title} />
            <AppCreatorTag creator={creator} />
          </div>
          <AppSubtitle subtitle={subtitle} />
          <AppTags tags={tags} />
        </div>
      </div>
    );
  }
}

AppItem.propTypes = {
  opts: PropTypes.shape({
    creator: PropTypes.arrayOf(PropTypes.string),
    iconURL: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    tags: PropTypes.objectOf(PropTypes.array),
  }).isRequired,
};

export default AppItem;
