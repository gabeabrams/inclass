import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import Guides from './Guides';

describe('client > src > Body > AppPage > AppPageContent > TabBox > Guides', () => {
  it('Checks text on page exists', async () => {
    // initializes the driver with the Guides info
    const driver = new Driver(
      <Guides />
    );

    // Grabs the text on Guides page
    const text = driver.getText('p');
    // Checks text on guides page matches expectations
    assert.equal(text, 'This is a placeholder for the Guides page',
      'The paragraph text is incorrect');
  });
});
