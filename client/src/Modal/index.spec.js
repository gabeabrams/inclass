import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import Modal from '.';
import OkayButton from '../shared/OkayButton';

describe.only('client > src > Modal', () => {
  it('Displays the Modal', async () => {
    // Create testing button to pass in as children
    let clicked = false;
    let onCloseClicked = false;
    const testButton = (
      <OkayButton
        text="Okay"
        onClick={() => { clicked = true; }}
      />
    );
    const driver = new Driver(
      <Modal
        title="testTitle"
        onClose={() => { onCloseClicked = true; }}
      >
        {testButton}
      </Modal>
    );
    // check that modal is rendered
    assert(driver.elementExists('.modal'), 'modal is not rendered');
    // check that title is rendered
    assert(
      driver.elementExists('.modal-title'),
      'title is not rendered on page'
    );
    assert.equal(
      driver.getText('.modal-title'),
      'testTitle',
      'title text was not rendered correctly'
    );
    // check that children is rendered
    assert(driver.elementExists('.okay-button'), 'children is not rendered');
    await driver.click('.okay-button');
    assert(clicked, 'children did not function as expected');
    // test click button that handles modal closing
    assert(driver.elementExists('.close'), 'close button is not rendered');
    await driver.click('.close');
    assert(onCloseClicked, 'did not handle modal closing correctly');
  });
});
