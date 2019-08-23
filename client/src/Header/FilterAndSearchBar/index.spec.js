import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import FilterAndSearchBar from '.';

describe('client > src > Header > FilterAndSearchBar', () => {
  it('Renders the filter and search bar', async () => {
    // Initialize driver
    const driver = new Driver(
      <FilterAndSearchBar
        filterDrawerOpen
        onFilterToggle={() => {}}
        searchQuery="test"
        onSearchChanged={() => {}}
        currentBodyType="test"
        onBackButtonClicked={() => {}}
      />
    );

    // Make sure that container is being rendered
    assert(
      driver.elementExists('.filterandsearchbar-container'),
      'Filter and search bar container is missing'
    );
  });
});
