import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import Screenshots from './index';

describe('client > src > Body > AppPage > AppPageContent > TabBox > Screenshots',
  () => {
    it('Checks all screenshots are there', async () => {
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

      // create new driver with screenshot element
      const driver = new Driver(
        <Screenshots app={app} />
      );

      // Checks that both screenshots exist
      const attOne = driver.getAttributes('#screenshot-1');
      const srcOne = attOne.src;
      assert(srcOne.includes('/public/dce/gradeup/screenshots/man_dash.png'));

      const attTwo = driver.getAttributes('#screenshot-2');
      const srcTwo = attTwo.src;
      assert(srcTwo.includes('/public/dce/gradeup/screenshots/event_chooser.png'));
    });
  });
