import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import TagValueFilterCheckBox from './TagValueFilterCheckBox';
import TagValueFilterCount from './TagValueFilterCount';
import TagValueFilterLabel from './TagValueFilterLabel';

// Import styling

class TagValueFilter extends Component {
  render() {

    const {
      tags,
      tagName,
    } = this.props;

    const tagValueElements = Object.keys(tag[tagName].values).map((tagValue) => {
      return (
        <div>
          <TagValueFilterCheckBox isChecked={tagValue} />
          <TagValueFilterLabel />
          <TagValueFilterCount />
        </div>
      );
    });

    return (

    );

  }
}
