import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import TitleBar from '.';

describe('client > src > Header > TitleBar', () => {
  it('Renders the title bar', async () => {
    // Initialize driver
    const driver = new Driver(
      <TitleBar
        storeTitle="Test Store Title"
        catalogTitle="Test Catalog Title"
      />
    );

    // Make sure container is being rendered
    assert(
      driver.elementExists('.titlebar-container'),
      'Container is missing'
    );
  });
});
