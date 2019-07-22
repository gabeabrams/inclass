// Using enzyme
// Write tests alongside their components.js in the folders
import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import CatalogTitle from './CatalogTitle';

describe('client > CatalogTitle', () => {
  it('Displays the AppStore Catalog Title', async () => {
    const driver = new Driver(
      <CatalogTitle
        catalogTitle="Fake Store Catalog Title"
      />
    );

    await assert(driver.elementExists('.catalogtitle-container'), 'Missing catalog title container');
    await assert(driver.elementExists('.font-weight-bold.mr-1'), 'Missing span for catalog title');
    await assert(driver.elementExists('.d-none.d-sm-inline'), 'Missing span for catalog text');
  });
});
