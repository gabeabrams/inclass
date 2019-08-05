import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppPageFooter from './index';

describe('client > src > Body > AppPage > AppPageFooter', () => {
  it('Checks install button exists when app is not installed and checks support button exists', async () => {
    // initializes the driver with the footer button
    const driver = new Driver(
      <AppPageFooter
        appInstalled={false}
        onInstallClicked={() => {}}
        onUninstallClicked={() => {}}
        onSupportClicked={() => {}}
      />
    );

    // Checks that install and support button exist, but not uninstall button
    assert(driver.elementExists('#install-button'), 'install button does not exist before click');
    assert(!driver.elementExists('#uninstall-button'), 'uninstall button exists when it should not');
    assert(driver.elementExists('#support-button'), 'support button does not exist');
  });

  it('Checks uninstall button exists when app is installed and checks support button exists', async () => {
    // initializes the driver with the footer button
    const driver = new Driver(
      <AppPageFooter
        appInstalled
        onInstallClicked={() => {}}
        onUninstallClicked={() => {}}
        onSupportClicked={() => {}}
      />
    );

    // Checks that uninstall and support button exist, but not install button
    assert(!driver.elementExists('#install-button'),
      'install button does not exist before click');
    assert(driver.elementExists('#uninstall-button'),
      'uninstall button exists when it should not');
    assert(driver.elementExists('#support-button'),
      'support button does not exist');
  });
});
