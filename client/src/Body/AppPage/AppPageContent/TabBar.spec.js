import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import TabBar from './TabBar';
import TAB_NAMES from './TAB_NAMES';

describe('client > src > Body > AppPage > AppPageContent > TabBar', () => {
  it('Handles clicks on tabs and checks screenshot tab active', async () => {
    // keep track of button clicks
    let clicked = false;
    let mostRecentTabName;
    // initializes driver with a tab bar
    const driver = new Driver(
      <TabBar
        onTabChanged={(tabName) => {
          clicked = true;
          mostRecentTabName = tabName;
        }}
        currentTab={TAB_NAMES.SCREENSHOTS}
        screenshotsExist
        guidesExist
      />
    );

    // clicks screenshots tab and checks that it is clicked
    driver.click('#screenshots-tab-button');
    assert(clicked, 'Screenshots tab was not clicked');
    assert.equal(
      mostRecentTabName,
      TAB_NAMES.SCREENSHOTS,
      'Did not specifically click screenshots'
    );

    // reset clicked to false to test clicking guides tab
    clicked = false;
    mostRecentTabName = null;
    driver.click('#guides-tab-button');
    assert(clicked, 'Guides tab was not clicked');
    assert.equal(mostRecentTabName, TAB_NAMES.GUIDES);

    // reset clicked to false to test clicking info tab
    clicked = false;
    mostRecentTabName = null;
    driver.click('#info-tab-button');
    assert(clicked, 'Info tab was not clicked');
    assert.equal(mostRecentTabName, TAB_NAMES.INFO);

    // Checks screenshots page is accurate
    const html = driver.getHTML('.active');
    assert(html.includes('screenshots'), 'not the correct tab (screenshots)');
  });

  it('Checks guides tab active', async () => {
    // initializes driver with a tab bar showing Guides
    const driver = new Driver(
      <TabBar
        onTabChanged={() => {
        }}
        currentTab={TAB_NAMES.GUIDES}
        screenshotsExist
        guidesExist
      />
    );

    // Checks guides page is active
    const html = driver.getHTML('.active');
    assert(html.includes('guides'), 'not the correct tab (guides)');
  });

  it('Checks info tab active', async () => {
    // initializes driver with a tab bar showing Guides
    const driver = new Driver(
      <TabBar
        onTabChanged={() => {}}
        currentTab={TAB_NAMES.INFO}
        screenshotsExist
        guidesExist
      />
    );

    // Checks screenshots page is active
    const html = driver.getHTML('.active');
    assert(html.includes('info'), 'not the correct tab (info)');
  });

  it('Checks each tab text is correct', async () => {
    // initializes driver with a tab bar
    const driver = new Driver(
      <TabBar
        onTabChanged={() => {}}
        currentTab={TAB_NAMES.SCREENSHOTS}
        screenshotsExist
        guidesExist
      />
    );

    // checks guides tab has correct text
    assert.equal(
      driver.getText('#guides-tab-button'),
      'Guides',
      'Guides tab text is not correct'
    );

    // checks screenshot tab has correct text
    assert.equal(
      driver.getText('#screenshots-tab-button'),
      'Screenshots',
      'Screenshots tab text is not correct'
    );

    // checks info tab has correct text
    assert.equal(
      driver.getText('#info-tab-button'),
      'Info',
      'Info tab text is not correct'
    );
  });

  it('Checks screenshots/guides tabs do not exist with no data', async () => {
    // initializes driver with an info only tab bar
    const driver = new Driver(
      <TabBar
        onTabChanged={() => {}}
        currentTab={TAB_NAMES.SCREENSHOTS}
        screenshotsExist={false}
        guidesExist={false}
      />
    );

    assert(driver.elementExists('#info-tab-button'), 'Info tab is missing');
    assert(
      !driver.elementExists('#guides-tab-button'),
      'Guides tab should not exist'
    );
    assert(
      !driver.elementExists('#screenshots-tab-button'),
      'Screenshots tab should not exist'
    );
  });
});
