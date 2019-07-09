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
      title: 'SwipeIn',
      subtitle: 'Quickly track attendance and/or assign people to tables/groups in the classroom via ID swipe or scan',
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
