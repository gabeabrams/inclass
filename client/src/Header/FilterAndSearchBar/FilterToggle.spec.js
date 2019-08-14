import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import FilterToggle from './FilterToggle';

describe('client > src > Header > FilterAndSearchBar > FilterToggle', () => {
  it('Has right-facing caret if filterDrawerOpen is false', async () => {
    // Initialize Driver
    const driver = new Driver(
      <FilterToggle
        filterDrawerOpen={false}
        onFilterToggle={() => {}}
      />
    );

    // Make sure that the caret being rendered is the sideways caret
    // because filterDrawerOpen is false
    await assert(driver.elementExists('.fa-caret-right'), 'Caret element is missing');
  });
  it('Has down-facing caret if filterDrawerOpen is true', async () => {
    // Initialize Driver
    const driver = new Driver(
      <FilterToggle
        filterDrawerOpen
        onFilterToggle={() => {}}
      />
    );

    // Make sure that the caret being rendered is the down caret because
    // filterDrawerOpen is true
    await assert(driver.elementExists('.fa-caret-down'), 'Caret element is missing');
  });
  it('Handles a click', async () => {
    let clicked;

    // Initialize Driver
    const driver = new Driver(
      <FilterToggle
        filterDrawerOpen={false}
        onFilterToggle={() => {
          clicked = true;
        }}
      />
    );

    // Make sure that button was clicked
    await driver.click('button');
    assert(clicked, 'Button was not clicked');
  });
});
