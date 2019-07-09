import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppItem from '../../shared/AppItem';

class AppList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfAppOpts: [],
    };
  }

  async componentDidMount() {
    const { apps } = this.props;
    let opts = {};
    const newListOfAppOpts = [];
    Object.keys(apps).forEach((appId) => {
      opts = {
        creator: apps[appId].creator,
        // iconURL does not exist in the original appStore, Change this!!!!
        iconURL: `https://localhost${apps[appId].icon.url}`,
        title: apps[appId].title,
        subtitle: apps[appId].subtitle,
        tags: apps[appId].tags,
      };
      newListOfAppOpts.push(opts);
    });
    this.setState({
      listOfAppOpts: newListOfAppOpts,
    });
  }

  render() {
    // fake opts object to pass in
    const { listOfAppOpts } = this.state;
    const appsToRender = listOfAppOpts.map((opts) => {
      return (
        <AppItem opts={opts} />
      );
    });
    return (
      <div>
        {appsToRender}
      </div>
    );
  }
}

AppList.propTypes = {
  apps: PropTypes.any.isRequired,
};

export default AppList;
