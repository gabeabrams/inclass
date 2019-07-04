import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppCreatorTag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Message: 26 apps match your search
    const { creator } = this.props;

    return (
      <div className="alert alert-warning">
        No status bar
      </div>
    );
  }
}

AppCreatorTag.propTypes = {
  creator: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AppCreatorTag;
