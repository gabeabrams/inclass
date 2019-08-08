import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import EmailAddress from './EmailAddress';

describe('client > src > shared > EmailForm > EmailAddress', () => {
  it('Displays the EmailAddress', async () => {
    const driver = new Driver(
      <EmailAddress
        address="Harvard@support.edu"
        subject="this is a test subject"
      />
    );
    // check if add on is rendered on page
    assert(driver.elementExists('#basic-addon3'), 'did not render correctly');
    assert.equal(driver.getText('#basic-addon3'), 'Send to:', 'did not render the correct text');
    // check if alert tag is rendered on page
    assert(driver.elementExists('.alert'), 'alert field did not render correctly');
    assert.equal(driver.getText('.alert'), 'Harvard@support.edu', 'email field did not display email passed in');
    // check if it goes to the correct mailto link when clicking email
    const link = driver.getAttributes('.emailLink').href;
    const expectedLink = `mailto:Harvard@support.edu?subject=${encodeURIComponent('this is a test subject')}`;
    assert.equal(link, expectedLink, 'did not generate the correct link based on email and subject passed in');
  });
});
