import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import Header from '.';

describe('client > src > Header', () => {
  const fakeApps = {
    gradeup: {
      tags: {
        cost: ['free'],
        type: ['grading'],
      },
    },
  };
  it('Renders the header of the appstore', async () => {
    const driver = new Driver(
      <Header
        storeHost=""
        storeTitle=""
        catalogTitle=""
        filterDrawerOpen
        onFilterToggle={() => {}}
        searchQuery=""
        onSearchChanged={() => {}}
        tags={{
          cost: {
            color: 'blue',
            values: {
              free: true,
            },
          },
        }}
        apps={fakeApps}
        onFilterChanged={() => {}}
        currentBodyType=""
        onBackButtonClicked={() => {}}
      />
    );

    assert(
      driver.elementExists('.header-container'),
      'Header container is missing'
    );
  });
  it('Will render a filter drawer if filterDrawerOpen is true', async () => {
    const driver = new Driver(
      <Header
        storeHost=""
        storeTitle=""
        catalogTitle=""
        filterDrawerOpen
        onFilterToggle={() => {}}
        searchQuery=""
        onSearchChanged={() => {}}
        tags={{
          cost: {
            color: 'blue',
            values: {
              free: true,
            },
          },
        }}
        apps={fakeApps}
        onFilterChanged={() => {}}
        currentBodyType=""
        onBackButtonClicked={() => {}}
      />
    );

    assert(
      driver.elementExists('.header-filter'),
      'Filter drawer is missing'
    );
  });
  it('Will not render a filter drawer is filterDrawerOpen is false', async () => {
    const driver = new Driver(
      <Header
        storeHost=""
        storeTitle=""
        catalogTitle=""
        filterDrawerOpen={false}
        onFilterToggle={() => {}}
        searchQuery=""
        onSearchChanged={() => {}}
        tags={{
          cost: {
            color: 'blue',
            values: {
              free: true,
            },
          },
        }}
        apps={fakeApps}
        onFilterChanged={() => {}}
        currentBodyType=""
        onBackButtonClicked={() => {}}
      />
    );

    assert.equal(
      driver.elementExists('.header-filter'),
      false,
      'Filter drawer is being rendered when it shouldn\'t be'
    );
  });
  it('Renders the titlebar and filter/search bar', async () => {
    const driver = new Driver(
      <Header
        storeHost=""
        storeTitle=""
        catalogTitle=""
        filterDrawerOpen={false}
        onFilterToggle={() => {}}
        searchQuery=""
        onSearchChanged={() => {}}
        tags={{
          cost: {
            color: 'blue',
            values: {
              free: true,
            },
          },
        }}
        apps={fakeApps}
        onFilterChanged={() => {}}
        currentBodyType=""
        onBackButtonClicked={() => {}}
      />
    );

    assert(
      driver.elementExists('.titlebar-container'),
      'Titlebar component is not being rendered properly'
    );

    assert(
      driver.elementExists('.filterandsearchbar-container'),
      'Filter and Search Bar component is not being rendered properly'
    );
  });
});
