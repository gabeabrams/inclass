import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import Guides from './index';

describe(
  'client > src > Body > AppPage > AppPageContent > TabBox > Guides',
  () => {
    it('Checks one guide is built', async () => {
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

      // create new driver with screenshot element
      const driver = new Driver(
        <Guides app={app} />
      );
    });
  }
);
