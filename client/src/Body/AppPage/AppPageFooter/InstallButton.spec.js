import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import InstallButton from './InstallButton';

describe('client > YourComponent', () => {
  it('Does a thing', async () => {
    let clicked;
    const driver = new Driver(
      <InstallButton
        title="Install Button"
        onClick={() => {
          clicked = true;
        }}
      />
    );

    driver.click('#install-button');
    assert(clicked, 'Button did not handle the click');
  });
});
