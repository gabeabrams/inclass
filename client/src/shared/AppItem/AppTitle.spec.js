import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppTitle from './AppTitle';

describe('client > src > shared > AppTitle', () => {
  it('Displays the AppTitle', async () => {
    const driver = new Driver(
      <AppTitle title="Harvard EdTech GradeUp" />
    );
    // check if app title is rendered on page
    assert(driver.elementExists('.app-title'), 'did not render correctly');
    assert.equal(driver.getText('.app-title'), 'Harvard EdTech GradeUp', 'did not display the correct title text');
  });
});
