import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppPage from './index';

describe('client > src > Body > AppPage', () => {
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

    // fake tag colors
    const fakeTagColors = {
      cost: {
        color: 'blue',
      },
      type: {
        color: 'red',
      },
    };

    // fake app
    const app = {
      screenshots: [screenshotOne, screenshotTwo],
      title: 'GradeUp',
      subtitle: 'greade up is a great tool',
      creator: ['dce'],
      icon: {
        url: '/public/dce/gradeup/icon',
      },
      supportEmail: 'example@harvard.edu',
      tags: {
        cost: ['free'],
        type: ['grading'],
      },
    };

    const fakeStoreHost = 'localhost';

    // initializes a new driver with AppPageContent
    const driver = new Driver(
      <AppPage
        app={app}
        storeHost={fakeStoreHost}
        tagColors={fakeTagColors}
        onInstallClicked={() => {}}
        onUninstallClicked={() => {}}
        onSupportClicked={() => {}}
      />
    );

    // Checks that the appItem exists
    assert(driver.elementExists('.appPage-appitem'), 'AppItem is absent');
    // Checks that the content exists
    assert(driver.elementExists('.appPage-content'), 'Main page is absent');
    // Checks the footer exists
    assert(driver.elementExists('.appPage-footer'), 'Footer is absent');
  });
});
