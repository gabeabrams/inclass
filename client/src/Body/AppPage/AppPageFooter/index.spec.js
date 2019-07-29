import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppPageFooter from './index';

describe('client > src > Body > AppPage > AppPageFooter', () => {
  it('Checks install button exists when app is not installed', async () => {
    let appInstalled = false;
    const supportClicked = true;
    // initializes the driver with the footer button
    const driver = new Driver(
      <AppPageFooter
        appInstalled={appInstalled}
        onInstallClicked={() => {
          appInstalled = true;
        }}
        onUninstallClicked={() => {
          appInstalled = false;
        }}
        onSupportClicked={() => {
          return supportClicked;
        }}
      />
    );

    assert(driver.elementExists('#install-button'), 'install button does not exist before click');
    assert(!driver.elementExists('#uninstall-button'), 'uninstall button exists when it should not');
    assert(driver.elementExists('#support-button'), 'support button does not exist');
  });

  it('Checks uninstall button exists when app is installed', async () => {
    let appInstalled = true;
    const supportClicked = true;
    // initializes the driver with the footer button
    const driver = new Driver(
      <AppPageFooter
        appInstalled={appInstalled}
        onInstallClicked={() => {
          appInstalled = true;
        }}
        onUninstallClicked={() => {
          appInstalled = false;
        }}
        onSupportClicked={() => {
          return supportClicked;
        }}
      />
    );

    assert(!driver.elementExists('#install-button'), 'install button does not exist before click');
    assert(driver.elementExists('#uninstall-button'), 'uninstall button exists when it should not');
    assert(driver.elementExists('#support-button'), 'support button does not exist');
  });
});
