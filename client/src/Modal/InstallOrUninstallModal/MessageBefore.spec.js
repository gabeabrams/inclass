import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import MessageBefore from './MessageBefore';

describe('client > src > Modal > InstallOrUninstallModal > MessageBefore', () => {
  it('Displays the Modal', () => {
    const message = 'please install with caution';
    const driver = new Driver(
      <MessageBefore
        message={message}
        onClose={() => {}}
        onClick={() => {}}
      />
    );
    // check that modal is rendered
    assert(driver.elementExists('.modal'), 'modal is not rendered');
    // check that body is rendered
    assert(
      driver.elementExists('.message-body-container'),
      'message body is not rendered'
    );
    // check that children is rendered
    assert(driver.elementExists('.okay-button'), 'okay button is not rendered');
    assert(
      driver.elementExists('.cancel-button'),
      'cancel button is not rendered'
    );
  });

  it('Displays the correct title for uninstall', () => {
    const message = 'please install with caution';
    const driver = new Driver(
      <MessageBefore
        message={message}
        onClose={() => {}}
        onClick={() => {}}
        uninstalling
      />
    );
    // check title is rendered
    assert(
      driver.elementExists('modal-title'),
      'modal title is not rendered'
    );
    assert.equal(
      driver.getText('modal-title'),
      'Please Read Before Uninstallling',
      'did not display correct title when uninstlling'
    );
  });
});
