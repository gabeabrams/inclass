import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import Info from './Info';

describe('client > src > Body > AppPage > AppPageContent > TabBox > Info', () => {
  it('Checks text when given no description', async () => {
    // initializes the driver with the Info page
    const driver = new Driver(
      <Info />
    );

    // Grabs the text on the Info page
    const text = driver.getText('p');
    assert.equal(text, 'No Description Provided', 'Text does not match');
  });

  it('Checks text when given a description', async () => {
    // initializes the driver with the Info page
    const driver = new Driver(
      <Info description="This is a fake description" />
    );

    // Grabs the text on the Info page
    const text = driver.getText('p');
    assert.equal(text, 'This is a fake description', 'Text does not match');
  });
});
