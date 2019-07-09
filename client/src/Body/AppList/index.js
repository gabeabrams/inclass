import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppItem from '../../shared/AppItem';

class AppList extends Component {
  render() {
    // const appCount = 12;
    // const creator = ['DCE', 'SEAS'];
    // const iconURL = 'https://localhost/public/dce/gradeup/icon';
    // const title = 'hello';
    // const subtitle = 'world';
    // const fakeTags = {
    //   cost: ['expensive'],
    //   type: ['grading', 'attendance'],
    // };
    const opts = {
      appCount: 12,
      creator: ['DCE', 'SEAS'],
      iconURL: 'https://localhost/public/dce/gradeup/icon',
      title: 'hello',
      subtitle: 'world',
      tags: {
        cost: ['expensive'],
        type: ['grading', 'attendance'],
      },
    };
    return (
      <div>
        <AppItem opts={opts} />
      </div>
    );
  }
}

export default AppList;
