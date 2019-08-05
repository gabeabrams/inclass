import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import SupportModal from './SupportModal';

describe('client > src > Modal > SupportModal', () => {
  it('Displays the modal', () => {
    const driver = new Driver(
      <SupportModal
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
