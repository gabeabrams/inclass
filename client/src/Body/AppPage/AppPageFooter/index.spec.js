import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppPageFooter from './index';

describe('client > src > Body > AppPage > AppPageFooter', () => {
  it('Checks buttons exist', async () => {

    // initializes the driver with the install button
    const driver = new Driver(
      <AppPageFooter />
    );
  });
});
