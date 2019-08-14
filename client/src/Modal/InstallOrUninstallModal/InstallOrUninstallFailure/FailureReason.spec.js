import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import FailureReason from './FailureReason';

describe('client > src > Modal > InstallOrUninstallModal InstallOrUninstallFailure > FailureReason', () => {
  it('Displays the body', async () => {
    const message = 'gradeup does not exist';
    const driver = new Driver(
      <FailureReason message={message} />
    );
    // check that body is rendered
    assert(
      driver.elementExists('.failure-reason-container'),
      'failure reason is not rendered'
    );
    assert.equal(
      driver.getText('.failure-reason-container'),
      message,
      'failure reason was not rendered correctly'
    );
  });
});
