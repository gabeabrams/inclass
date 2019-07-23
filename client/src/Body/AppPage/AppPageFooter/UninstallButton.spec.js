import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import UninstallButton from './UninstallButton';

describe('client > src > Body > App Page > AppPageFooter > InstallButton', () => {
  it('Handles a click', async () => {
    // keep track of button clicks
    let clicked = false;

    // initializes the driver with the uninstall button
    const driver = new Driver(
      <UninstallButton
        title="Uninstall Button"
        onClick={() => {
          clicked = true;
        }}
      />
    );

    // simulates a click
    driver.click('#uninstall-button');
    // makes sure the button was clicked
    assert(clicked, 'Button did not handle the click');
  });
});
