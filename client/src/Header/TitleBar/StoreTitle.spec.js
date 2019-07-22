// Using enzyme
// Write tests alongside their components.js in the folders
import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import StoreTitle from './StoreTitle';

describe('client > StoreTitle', () => {
  it('Displays the AppStore Title', async () => {
    const driver = new Driver(
      <StoreTitle
        storeTitle="Fake Store Title"
      />
    );

    await assert(driver.elementExists('.storetitle-container'));
    await assert(driver.elementExists('.font-weight-bold'));
  });
});
