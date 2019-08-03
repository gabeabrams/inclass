import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppListStatusBar from './AppListStatusBar';

describe('client > src > Body > AppListStatusBar', () => {
  it('Displays the AppListStatusBar', async () => {
    const driver = new Driver(
      <AppListStatusBar appCount={1} />
    );
    // check if appListStatusBar is rendered on page
    assert(driver.elementExists('.app-list-status-bar-container'), 'did not render correctly');
    assert.equal(driver.getText('.app-list-status-bar-container'), '1 app matches your search', 'did not display the correct message');
  });

  it('Displays no apps if appCount is not passed in', () => {
    const driver = new Driver(
      <AppListStatusBar />
    );
    // Check if no apps matching message is displayed
    const text = driver.getText('.app-list-status-bar-container');
    assert(
      text.includes('There are no matching apps. Please broaden your search criteria'),
      'did not display no matching apps message when appCount is 0'
    );
  });

  it('Displays the correct message with 7 apps', () => {
    const driver = new Driver(
      <AppListStatusBar appCount={7} />
    );
    assert.equal(driver.getText('.app-list-status-bar-container'), '7 apps match your search', 'did not display the correct message');
  });
});
