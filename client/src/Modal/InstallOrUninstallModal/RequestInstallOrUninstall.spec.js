import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import RequestInstallOrUninstall from './RequestInstallOrUninstall';

describe('client > src > Modal > InstallOrUninstallModal > RequestInstallOrUninstall', () => {
  it('Displays the modal', () => {
    const driver = new Driver(
      <RequestInstallOrUninstall
        address="testEmail@gmail.com"
        subject="testSubject"
        onClose={() => {}}
      />
    );
    // check that modal is rendered
    assert(driver.elementExists('.modal'), 'modal is not rendered');
    // check that email form is rendered
    assert(driver.elementExists('.emailform-container'), 'did not render email form');
  });
});
