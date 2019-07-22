import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import SupportButton from './SupportButton';

describe('client > YourComponent', () => {
  it('Handles a click', async () => {
    let clicked;
    const driver = new Driver(
      <SupportButton
        title="Support Button"
        onClick={() => {
          clicked = true;
        }}
      />
    );

    driver.click('#support-button');
    assert(clicked, 'Button did not handle the click');
  });
});
