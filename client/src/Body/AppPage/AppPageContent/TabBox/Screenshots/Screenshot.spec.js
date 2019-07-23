import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import Screenshot from './Screenshot';

describe('client > src > Body > App Page > AppPageContent > TabBox > Screenshots > Screenshot', () => {
  it('Checks screenshot image is there', async () => {
    // fake screenshot data
    const screenshot = {
      title: 'Event Chooser',
      filename: 'event_chooser.png',
      url: '/public/dce/gradeup/screenshots/event_chooser.png',
    };

    // create new driver with screenshot element
    const driver = new Driver(
      <Screenshot screenshot={screenshot} />
    );

    // checks that the screenshot exists
    assert(driver.elementExists('.card-img-top'), 'Screenshot is absent');
  });
});
