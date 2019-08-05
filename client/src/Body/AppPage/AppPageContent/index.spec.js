import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppPageContent from './index';

describe('client > src > Body > AppPage > AppPageContent', () => {
  it('Checks tab bar and default content exists', async () => {
    // first fake screenshot
    const screenshotOne = {
      title: 'Manual Seating Dashboard',
      filename: 'man_dash.png',
      url: '/public/dce/gradeup/screenshots/man_dash.png',
    };
    // second fake screenshot
    const screenshotTwo = {
      title: 'Event Chooser',
      filename: 'event_chooser.png',
      url: '/public/dce/gradeup/screenshots/event_chooser.png',
    };

    // fake app
    const app = {
      screenshots: [screenshotOne, screenshotTwo],
    };

    const fakeStoreHost = 'storehost';

    // initializes a new driver with AppPageContent
    const driver = new Driver(
      <AppPageContent app={app} storeHost={fakeStoreHost} />
    );

    // Checks that the tab bar exists
    assert(driver.elementExists('.nav'), 'Tab bar is absent');
    // Checks the default content exists
    assert(driver.elementExists('.screenshots-container'),
      'screenshots is absent');
  });
});
