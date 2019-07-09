import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import AppItem from '../../shared/AppItem';

class AppList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfApps: [],
    };
  }

  async componentDidMount() {
    const { apps } = this.props;
    let opts = {};
    const newListOfApps = [];
    Object.keys(apps).forEach((appId) => {
      opts = {
        creator: apps[appId].creator,
        // iconURL does not exist in the original appStore, Change this!!!!
        iconURL: `https://localhost${apps[appId].icon.url}`,
        title: apps[appId].title,
        subtitle: apps[appId].subtitle,
        tags: apps[appId].tags,
      };
      newListOfApps.push(<AppItem opts={opts} />);
    });
    this.setState({
      listOfApps: newListOfApps,
    });
  }

  render() {
    // fake opts object to pass in
    const { listOfApps } = this.state;
    return (
      <div>
        {listOfApps}
      </div>
    );
  }
}

AppList.propTypes = {
  apps: PropTypes.any.isRequired,
};

export default AppList;
