// Using enzyme
// Write tests alongside their components.js in the folders
import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import StoreTitle from './StoreTitle';

describe('client > src > Header > TitleBar > StoreTitle', () => {
  it('Displays the AppStore Title', async () => {
    const driver = new Driver(
      <StoreTitle
        storeTitle="Fake Store Title"
      />
    );

    // Make sure that storetitle container is rendered
    await assert(driver.elementExists('.storetitle-container'), 'Missing StoreTitle container');
    // Make sure that storetitle title is rendered
    await assert(driver.elementExists('.storetitle-title.font-weight-bold'), 'Missing span for storeTitle');
    // Make sure that storeTitle prop is being used to set store title
    await assert.equal(driver.getText('.storetitle-title'), 'Fake Store Title', 'storeTitle prop is not being used properly');
    // Make sure that storetitle text is rendered
    await assert(driver.elementExists('.storetitle-text.ml-1.d-none.d-sm-inline'), 'Missing span for \'App Store\' Text');
  });
});
