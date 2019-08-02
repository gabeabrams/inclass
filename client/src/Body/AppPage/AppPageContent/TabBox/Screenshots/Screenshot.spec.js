import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import Screenshot from './Screenshot';

describe('client > src > Body > AppPage > AppPageContent > TabBox > Screenshots > Screenshot',
  () => {
    it('Checks screenshot image is there', async () => {
      // fake screenshot data
      const screenshot = {
        title: 'Event Chooser',
        filename: 'event_chooser.png',
        url: '/public/dce/gradeup/screenshots/event_chooser.png',
      };

      // create new driver with screenshot element
      const driver = new Driver(
        <Screenshot screenshot={screenshot} index={1} />
      );

      // checks that the screenshot exists
      assert(driver.elementExists('#screenshot-1'), 'Screenshot is absent');
    });
  });
