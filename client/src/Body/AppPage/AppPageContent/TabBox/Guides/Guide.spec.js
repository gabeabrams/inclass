import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import Guide from './Guide';

describe(
  'client > src > Body > AppPage > AppPageContent > TabBox > Guides > Guide',
  () => {
    it('', async () => {
      // fake guide data
      const guide = {
        title: 'Fake Guide',
        steps: [
          'Fake Step One',
          'Fake Step Two',
          'Fake Step Three',
        ],
      };

      // create new driver with guide element
      const driver = new Driver(
        <Guide guide={guide} />
      );

      // Check title matches expected
      assert.equal(
        driver.getText('.card-title'),
        'Fake Guide',
        'Title does not match expected'
      );

      // Check 3 steps were rendered
      assert(driver.elementExists('.step-1'), 'Step one does not exist');
      assert(driver.elementExists('.step-2'), 'Step two does not exist');
      assert(driver.elementExists('.step-3'), 'Step three does not exist');
    });
  }
);
