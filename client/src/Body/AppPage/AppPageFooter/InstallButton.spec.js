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
    
    // TODO: check button is visible and text shows
    // simulate a click
    driver.click('#install-button');
    // makes sure button is clicked
    assert(clicked, 'Button did not handle the click');
  });
});
