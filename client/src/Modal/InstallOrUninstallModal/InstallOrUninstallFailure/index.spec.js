import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import InstallOrUninstallFailure from '.';

describe('client > src > Modal > InstallOrUninstallModal > InstallOrUninstallFailure', () => {
  it('Displays the Modal', () => {
    const message = 'installation failed';
    const driver = new Driver(
      <InstallOrUninstallFailure
        message={message}
        onClose={() => {}}
        onSupportButtonClicked={() => {}}
      />
    );
    // check that modal is rendered
    assert(driver.elementExists('.modal'), 'modal is not rendered');
    // check that failure reason is rendered
    assert(driver.elementExists('.failure-reason-container'), 'failure reason is not rendered');
    // check that support button is rendered
    assert(driver.elementExists('.support-button'), 'support button is not rendered');
    // check that title is correct
    assert.equal(driver.getText('.modal-title'), 'Install Failed!', 'title is not correct');
  });

  it('Displays the correct title when unisntalling', () => {
    const message = 'installation succeeded';
    const driver = new Driver(
      <InstallOrUninstallFailure
        message={message}
        onClose={() => {}}
        onSupportButtonClicked={() => {}}
        uninstall
      />
    );
    assert.equal(driver.getText('.modal-title'), 'Uninstall Failed!', 'title is not correct');
  });
});
