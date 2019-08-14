import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import Step from './Step';

describe(
  'client > src > Body > AppPage > AppPageContent > TabBox > Guides > Step',
  () => {
    it('Checks text is correct for the step', async () => {
      // create new driver with step element
      const driver = new Driver(
        <Step step="This is an instruction" stepNum={1} />
      );
      // Check instruction matches text given
      assert.equal(
        driver.getText('.step-instructions'),
        'This is an instruction',
        'Step text does not match what is given'
      );
      // Checks step number matches what was given
      assert.equal(
        driver.getText('.badge'),
        '1',
        'Step number does not match what is given'
      );
    });
  }
);
