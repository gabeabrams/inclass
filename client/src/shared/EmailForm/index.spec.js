import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import EmailForm from '.';

describe('client > src > shared > EmailForm', () => {
  it('Displays the EmailForm', async () => {
    const driver = new Driver(
      <EmailForm
        address="lshhenry98@gmail.com"
        subject="this is a test subject"
      />
    );
    const emailFormHTML = driver.getHTML('.emailform-container');
    // check if EmailAddress is rendered on page
    assert(emailFormHTML.includes('email-address-container'), 'did not render email address component');
    // check if EmailSubject is rendered on page
    assert(emailFormHTML.includes('email-subject-container'), 'did not render email address component');
  });
});
