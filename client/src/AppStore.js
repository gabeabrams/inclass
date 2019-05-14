// Import caccl
import initCACCL from 'caccl/client/cached';

// Import React
import React, { Component } from 'react';

// Initialize caccl
const { api, getStatus } = initCACCL();

class AppStore extends Component {
  /**
   * Initialize AppStore component
   */
  constructor(props) {
    super(props);

    // Set up state
    this.state = {
      message: 'Loading! Just a moment...',
    };
  }

  /**
   * Called when the component mounted, pulls state and user profile from server
   */
  async componentDidMount() {
    // Load status
    try {
      // Get status from server
      const status = await getStatus();

      // > AppStore wasn't launched via Canvas
      if (!status.launched) {
        return this.setState({
          message: 'Please launch this app from Canvas.',
        });
      }

      // > AppStore is not authorized
      if (!status.authorized) {
        return this.setState({
          message: 'We don\'t have access to Canvas. Please re-launch the app.',
        });
      }
    } catch (err) {
      return this.setState({
        message: `Error while requesting state from server: ${err.message}`,
      });
    }

    // Load profile information
    try {
      // Get profile from Canvas via api
      const profile = await api.user.self.getProfile();

      // Update state
      return this.setState({
        message: `Hi ${profile.name}! Your CACCL app is ready!`,
      });
    } catch (err) {
      return this.setState({
        message: `Error while requesting user profile: ${err.message}`,
      });
    }
  }

  /**
   * Render the AppStore
   */
  render() {
    // Deconstruct the state
    const { message } = this.state;

    // Render the component
    return (
      <h4>
        {message}
      </h4>
    );
  }
}

export default AppStore;
