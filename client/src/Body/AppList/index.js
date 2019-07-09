import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppItem from '../../shared/AppItem';

class AppList extends Component {
  render() {
    // fake opts object to pass in
    const opts = {
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
