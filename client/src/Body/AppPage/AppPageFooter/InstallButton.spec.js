import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import InstallButton from './InstallButton';

describe('client > src > Body > AppPage > AppPageFooter > InstallButton', () => {
  it('Handles a click', async () => {
    // keep track of button clicks
    let clicked = false;

    // initializes the driver with the install button
    const driver = new Driver(
      <InstallButton
        title="Install Button"
        onClick={() => {
          clicked = true;
        }}
      />
    );

    // checks button exists
    assert(driver.elementExists('#install-button'), 'install button absent');
    // checks that button says "Install"
    assert.equal(driver.getText('#install-button'), 'Install',
      'Text on install button does not match expected');
    // simulate a click
    driver.click('#install-button');
    // makes sure button is clicked
    assert(clicked, 'Button did not handle the click');
  });
});
