import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import SupportButton from './SupportButton';

describe('client > src > Body > App Page > AppPageFooter > SupportButton', () => {
  it('Handles a click', async () => {
    // keep track of button clicks
    let clicked = false;

    // initializes the driver with the support button
    const driver = new Driver(
      <SupportButton
        title="Support Button"
        onClick={() => {
          clicked = true;
        }}
      />
    );

    // checks button exists
    assert(driver.elementExists('#support-button'), 'Support button absent');
    // checks that button says "Get Support"
    assert.equal(driver.getText('#support-button'), 'Get Support',
      'Text on button does not match expected');
    // simulates a click
    driver.click('#support-button');
    // checks that the button is clicked
    assert(clicked, 'Button did not handle the click');
  });
});
