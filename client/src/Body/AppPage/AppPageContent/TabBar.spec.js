import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import TabBar from './TabBar';
import TAB_NAMES from './TAB_NAMES';

describe('client > src > Body > AppPage > AppPageContent > TabBar', () => {
  it('Handles clicks on tabs', async () => {
    // keep track of button clicks
    let clicked = false;
    let mostRecentTabName;
    // initializes driver with a tab bar
    const driver = new Driver(
      // TODO: have onTabChanged take a param
      <TabBar
        onTabChanged={(tabName) => {
          clicked = true;
          mostRecentTabName = tabName;
        }}
        currentTab={TAB_NAMES.SCREENSHOTS}
      />
    );

    // TODO: test currentTab functionality (check html)
    // TODO: Add comments

    // clicks screenshots tab and checks that it is clicked
    driver.click('#screenshots');
    assert(clicked, 'Screenshots tab was not clicked');
    assert.equal(mostRecentTabName, TAB_NAMES.SCREENSHOTS,
      'Did not specifically click screenshots');

    // reset clicked to false to test clicking guides tab
    clicked = false;
    mostRecentTabName = null;
    driver.click('#guides');
    assert(clicked, 'Guides tab was not clicked');
    assert.equal(mostRecentTabName, TAB_NAMES.GUIDES);

    // reset clicked to false to test clicking info tab
    clicked = false;
    mostRecentTabName = null;
    driver.click('#info');
    assert(clicked, 'Info tab was not clicked');
    assert.equal(mostRecentTabName, TAB_NAMES.INFO);

    // Checks screenshots page is accurate
    // const att = driver.getHTML('.nav-link active');
    // console.log('ATT: ', att);
  });
});
