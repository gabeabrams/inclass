import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import SearchField from './SearchField';

describe('client > src > Header > FilterAndSearchBar > SearchField', () => {
  it('Allows user to type into input field and updates the search query in the store', async () => {
    // Fake query string to be updated when onSearchChanged is called
    let testQuery;

    // Initialize Driver
    const driver = new Driver(
      <SearchField
        searchQuery=""
        onSearchChanged={(newSearchQuery) => {
          testQuery = newSearchQuery;
        }}
      />
    );

    // Simulate typing
    await driver.typeInto('.form-control', 'hello!');
    // Assert that prop is updated after typing
    assert.equal(testQuery, 'hello!');
  });
});
