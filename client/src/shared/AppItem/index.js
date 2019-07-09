import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppListStatusBar from '../../Body/AppList/AppListStatusBar';
import AppCreatorTag from './AppCreatorTag';
import AppIcon from './AppIcon';
import AppTitle from './AppTitle';
import AppSubtitle from './AppSubtitle';
import AppTags from './AppTags';

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
      <div>
        <AppCreatorTag creator={creator} />
        <AppIcon iconURL={iconURL} />
        <AppTitle title={title} />
        <AppSubtitle subtitle={subtitle} />
        <AppTags tags={tags} />
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
