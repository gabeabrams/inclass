// Using enzyme
// Write tests alongside their components.js in the folders
import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import CatalogTitle from './CatalogTitle';

describe('client > src > Header > TitleBar > CatalogTitle', () => {
  it('Displays the AppStore Catalog Title', async () => {
    const driver = new Driver(
      <CatalogTitle
        catalogTitle="Fake Store Catalog Title"
      />
    );

    // Make sure that catalogtitle container is rendered
    await assert(driver.elementExists('.catalogtitle-container'), 'Missing catalog title container');
    // Make sure that catalog title span is rendered
    await assert(driver.elementExists('.catalogtitle-title'), 'Missing span for catalog title');
    // Make sure that span for text is rendered
    await assert(driver.elementExists('.catalogtitle-catalogtext'), 'Missing span for catalog text');
  });
});
