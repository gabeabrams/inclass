import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppListStatusBar from './AppListStatusBar';

describe('client > src > Body > AppListStatusBar', () => {
  it('Displays the AppListStatusBar', async () => {
    const driver = new Driver(
      <AppListStatusBar appCount={1} />
    );
    // check if app subtitle is rendered on page
    assert(driver.elementExists('.app-list-status-bar-container'), 'did not render correctly');
  });
});
