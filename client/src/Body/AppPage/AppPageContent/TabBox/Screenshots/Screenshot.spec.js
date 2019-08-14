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

      const fakeStoreHost = 'localhost';

      // create new driver with screenshot element
      const driver = new Driver(
        <Screenshot
          screenshot={screenshot}
          index={1}
          storeHost={fakeStoreHost}
        />
      );

      // checks that the screenshot exists
      assert(driver.elementExists('#screenshot-1'), 'Screenshot is absent');
      // checks that title of screenshot card is correct
      assert.equal(driver.getText('.card-title'), 'Event Chooser',
        'Screenshot title is not right');
      // checks that url of screenshot image is correct
      const att = driver.getAttributes('#screenshot-1');
      const { src } = att;
      assert(src.includes('/public/dce/gradeup/screenshots/event_chooser.png'));
    });
  });
