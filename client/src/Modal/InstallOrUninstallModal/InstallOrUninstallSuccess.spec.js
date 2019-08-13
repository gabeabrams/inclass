import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import InstallOrUninstallSuccess from './InstallOrUninstallSuccess';

describe('client > src > Modal > InstallOrUninstallModal > InstallOrUninstallSuccess', () => {
  it('Displays the Modal', () => {
    const message = 'installation succeeded';
    const appName = 'SwipeIn';
    const driver = new Driver(
      <InstallOrUninstallSuccess
        message={message}
        onClose={() => {}}
        appName={appName}
      />
    );
    // check that modal is rendered
    assert(driver.elementExists('.modal'), 'modal is not rendered');
    // check that body is rendered
    assert(driver.elementExists('.message-body-container'), 'message body is not rendered');
    // check that children is rendered
    assert(driver.elementExists('.okay-button'), 'okay button is not rendered');
    // check that title is correct
    assert.equal(driver.getText('.modal-title'), `${appName} Installed!`, 'title is not correct');
  });

  it('Displays the correct title when unisntalling', () => {
    const message = 'installation succeeded';
    const appName = 'SwipeIn';
    const driver = new Driver(
      <InstallOrUninstallSuccess
        message={message}
        onClose={() => {}}
        appName={appName}
        uninstalling
      />
    );
    assert.equal(driver.getText('.modal-title'), `${appName} Uninstalled!`, 'title is not correct when unisntalling');
  });
});
