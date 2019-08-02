import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import CopyButton from './CopyButton';

describe('client > src > shared > EmailForm > CopyButton', () => {
  it('Displays the CopyButton', async () => {
    const driver = new Driver(
      <CopyButton text="testText" />
    );
    // check if Copy Button is rendered on page
    assert(driver.elementExists('.btn-clipboard'), 'did not render copy button correctly');
    assert.equal(driver.getText('.btn-clipboard'), 'Copy', 'did not render the correct text');
  });
});
