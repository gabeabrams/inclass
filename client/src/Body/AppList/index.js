import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppListStatusBar from './AppListStatusBar';
import AppCreatorTag from '../../shared/AppItem/AppCreatorTag';
import AppIcon from '../../shared/AppItem/AppIcon';
import AppTitle from '../../shared/AppItem/AppTitle';
import AppSubtitle from '../../shared/AppItem/AppSubtitle';
import AppTag from '../../shared/AppItem/AppTags/AppTag';
import AppTags from '../../shared/AppItem/AppTags';

class AppList extends Component {
  render() {
    const fakeTags = {
      cost: ['expensive'],
      type: ['grading', 'attendance'],
    };
    return (
      <div>
        <AppListStatusBar appCount={12} />
        <AppCreatorTag creator={['DCE', 'SEAS']} />
        <AppIcon iconURL="https://localhost/public/dce/gradeup/icon" />
        <AppTitle title="hello" />
        <AppSubtitle subtitle="nah" />
        <AppTag tagKey="hello" tagValue="world" />
        <AppTags tags={fakeTags} />
      </div>
    );
  }
}

export default AppList;
