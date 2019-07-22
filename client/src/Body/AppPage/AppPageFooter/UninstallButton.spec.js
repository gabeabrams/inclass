import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import UninstallButton from './UninstallButton';

describe('client > src > Body > App Page > AppPageFooter > InstallButton', () => {
  it('Handles a click', async () => {
    let clicked;
    const driver = new Driver(
      <UninstallButton
        title="Uninstall Button"
        onClick={() => {
          clicked = true;
        }}
      />
    );

    driver.click('#uninstall-button');
    assert(clicked, 'Button did not handle the click');
  });
});
