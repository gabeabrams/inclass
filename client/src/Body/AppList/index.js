import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppItem from '../../shared/AppItem';

class AppList extends Component {
  render() {
    const appCount = 12;
    const creator = ['DCE', 'SEAS'];
    const iconURL = 'https://localhost/public/dce/gradeup/icon';
    const title = 'hello';
    const subtitle = 'world';
    const fakeTags = {
      cost: ['expensive'],
      type: ['grading', 'attendance'],
    };
    return (
      <div>
        <AppItem appCount={appCount} creator={creator} iconURL={iconURL} title={title} subtitle={subtitle} tags={fakeTags} />
      </div>
    );
  }
}

export default AppList;
