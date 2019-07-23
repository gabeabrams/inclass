import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppSubtitle from './AppSubtitle';

describe('client > src > shared > AppSubtitle', () => {
  it('Displays the AppSubtitle', async () => {
    const driver = new Driver(
      <AppSubtitle appSubtitle="Harvard Icon" />
    );
    // check if app creator tag is rendered on page
    assert(driver.elementExists('.app-subtitle'), 'did not render correctly');
  });
});
