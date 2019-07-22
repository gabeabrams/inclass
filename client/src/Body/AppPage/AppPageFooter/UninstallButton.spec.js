import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import UninstallButton from './UninstallButton';

describe('client > YourComponent', () => {
  it('Does a thing', async () => {
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
