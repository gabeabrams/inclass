import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import MessageBody from './MessageBody';

describe('client > src > Modal > InstallOrUninstallModal > MessageBody', () => {
  it('Displays the body', async () => {
    const driver = new Driver(
      <MessageBody messageBody="Please install with caution" />
    );
    // check that body is rendered
    assert(driver.elementExists('.message-body-container'), 'message body is not rendered');
    assert.equal(driver.getText('.message-body-container'), 'Please install with caution', 'message before was not rendered correctly');
  });
});
