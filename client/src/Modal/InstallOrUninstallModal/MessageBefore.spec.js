import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import MessageBefore from './MessageBefore';

describe('client > src > Modal > InstallOrUninstallModal > MessageBefore', () => {
  it('Displays the Modal', () => {
    const driver = new Driver(
      <MessageBefore
        messageBefore="please install with caution"
        onClose={() => {}}
        onClick={() => {}}
      />
    );
    // check that modal is rendered
    assert(driver.elementExists('.modal'), 'modal is not rendered');
    // check that body is rendered
    assert(driver.elementExists('.message-body-container'), 'message body is not rendered');
    // check that children is rendered
    assert(driver.elementExists('.okay-button'), 'okay button is not rendered');
    assert(driver.elementExists('.cancel-button'), 'cancel button is not rendered');
  });
});
