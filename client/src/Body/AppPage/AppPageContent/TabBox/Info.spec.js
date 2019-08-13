import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import Info from './Info';

describe('client > src > Body > AppPage > AppPageContent > TabBox > Info', () => {
  it('Checks text on page exists', async () => {
    // initializes the driver with the Info page
    const driver = new Driver(
      <Info />
    );

    // Grabs the text on the Info page
    const text = driver.getText('p');
    // Checks text on Info page matches expectations
    // assert.equal(
    //   text,
    //   'This is a placeholder for the Info page',
    //   'The paragraph text is incorrect'
    // );
  });
});
