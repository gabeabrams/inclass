import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import TabBar from './TabBar';
import TAB_NAMES from './TAB_NAMES';

describe('client > src > Body > AppPage > AppPageContent > TabBar', () => {
  it('Handles clicks on tabs', async () => {
    let clicked = false;
    const driver = new Driver(
      <TabBar
        onClick={() => {
          clicked = true;
        }}
        currentTab={TAB_NAMES.SCREENSHOTS}
      />
    );

    driver.click('#screenshots');
    assert(clicked, 'Screenshot tab was not clicked');

    clicked = false;
    driver.click('#guides');
    assert(clicked, 'Guides tab was not clicked');

    clicked = false;
    driver.click('#info');
    assert(clicked, 'Info tab was not clicked');
  });
});
