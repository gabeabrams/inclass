import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppCreatorTag from './AppCreatorTag';

describe('client > src > shared > AppCreatorTag', () => {
  it('Displays the AppCreatorTag', async () => {
    const driver = new Driver(
      <AppCreatorTag creator={['hello']} dark />
    );
    // check if app creator tag is rendered on page
    assert(driver.elementExists('.appcreatortag-box'), 'did not render correctly');
    assert.equal(driver.getText('.appcreatortag-box'), 'by hello', 'did not display the correct message');
  });

  it('Displays with light background when dark is not passed in', () => {
    const driver = new Driver(
      <AppCreatorTag creator={['world']} />
    );
    // check if app creator tag is rendered with light background
    assert(driver.elementExists('.badge-light'), 'did not render correctly');
    assert.equal(driver.getText('.appcreatortag-box'), 'by world', 'did not display the correct message');
  });
});
