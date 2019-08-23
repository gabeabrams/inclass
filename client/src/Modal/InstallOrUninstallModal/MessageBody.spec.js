import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import MessageBody from './MessageBody';

describe('client > src > Modal > InstallOrUninstallModal > MessageBody', () => {
  const message = (
    <div>
      <div>The app is now installed!</div>
      <div>
        Now, refresh your Canvas page for the changes to be applied.
      </div>
    </div>
  );
  it('Displays the body', async () => {
    const driver = new Driver(
      <MessageBody messageBody={message} />
    );
    // check that body is rendered
    assert(
      driver.elementExists('.message-body-container'),
      'message body is not rendered'
    );
    assert.equal(
      driver.getText('.message-body-container'),
      'The app is now installed!Now, refresh your Canvas page for the changes to be applied.',
      'message before was not rendered correctly'
    );
  });
});
