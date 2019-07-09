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
    const {
      appCount,
      creator,
      iconURL,
      title,
      subtitle,
      tags,
    } = this.props;

    return (
      <div>
        <AppListStatusBar appCount={appCount} />
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
  appCount: PropTypes.number.isRequired,
  creator: PropTypes.arrayOf(PropTypes.string).isRequired,
  iconURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  tags: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default AppItem;
