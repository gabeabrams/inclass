import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Import other components
import Guide from './Guide';
import TabBox from '..';

/**
 * Renders all the guide(s) from the store
 */
class Guides extends Component {
  render() {
    // deconstruct props
    const { app } = this.props;
    const { guides } = app;

    // maps the guides to toRender with styling
    const toRender = guides.map((guide, index) => {
      const keyName = `pt-2 guide-${index}`;
      return (
        <div className={keyName} key={keyName}>
          <div className="guides-elem">
            <Guide guide={guide} />
          </div>
        </div>
      );
    });

    return (
      <TabBox>
        <div className="guides-container">
          {toRender}
        </div>
      </TabBox>
    );
  }
}

Guides.propTypes = {
  // The app whose guides we want
  app: PropTypes.shape({
    // Array of guides
    guides: PropTypes.arrayOf(
      PropTypes.shape({
        // a string for the title of the guide
        title: PropTypes.string,
        // array of strings to iterate the steps for each guide
        steps: PropTypes.arrayOf(
          PropTypes.string
        ),
      })
    ),
  }).isRequired,
};

export default Guides;
