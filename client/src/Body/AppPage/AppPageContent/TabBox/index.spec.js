import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import TabBox from './index';

describe('client > src > Body > AppPage > AppPageContent > TabBox', () => {
  it('Checks there is a div around children', async () => {
    // initializes the driver with TabBox around some text
    const driver = new Driver(
      <TabBox>
        <p>Fake Text</p>
      </TabBox>
    );

    // Checks TabBox exists
    assert(driver.elementExists('.tabbox-container'), 'Tab Box is absent');
    // Check children is correct
    assert.equal(
      driver.getText('p'),
      'Fake Text',
      'children text was incorrect'
    );
  });
});
