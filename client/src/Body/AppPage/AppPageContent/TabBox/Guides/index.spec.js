import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import Guides from './index';

describe(
  'client > src > Body > AppPage > AppPageContent > TabBox > Guides',
  () => {
    it('Checks one guide exists', async () => {
      // first fake guide
      const guide = {
        title: 'Getting Started',
        steps: [
          'Launch Gradeup',
          'Click Admin Dashboard',
          'Enter your full name',
          'Upload your list of lectures as a CSV',
        ],
      };

      // fake app
      const app = {
        guides: [guide],
      };

      // create new driver with guides element
      const driver = new Driver(
        <Guides app={app} />
      );

      // Checks one guide exists
      assert(driver.elementExists('.guide-0'), 'Guide does not exist');
    });

    it('Checks more than one guide exists', async () => {
      // first fake guide
      const guideOne = {
        title: 'Getting Started',
        steps: [
          'Launch Gradeup',
          'Click Admin Dashboard',
          'Enter your full name',
          'Upload your list of lectures as a CSV',
        ],
      };

      // second fake guide
      const guideTwo = {
        title: 'Guide Two',
        steps: [
          'One',
          'TWO',
          'ThrEE',
          'Fourssss',
        ],
      };

      // Fake app
      const app = {
        guides: [guideOne, guideTwo],
      };

      // create new driver with guides element
      const driver = new Driver(
        <Guides app={app} />
      );

      // Checks both guide exists
      assert(driver.elementExists('.guide-0'), 'Guide One does not exist');
      assert(driver.elementExists('.guide-1'), 'Guide Two does not exist');
    });
  }
);
