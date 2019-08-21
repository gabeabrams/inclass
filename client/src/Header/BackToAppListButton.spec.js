import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import BackToAppListButton from './BackToAppListButton';

describe('client > src > Header > BackToAppListButton', () => {
  it('Handles a click', async () => {
    // keep track of button clicks
    let clicked = false;

    // initializes the driver with the back button
    const driver = new Driver(
      <BackToAppListButton
        onBackButtonClicked={() => {
          clicked = true;
        }}
      />
    );

    // simulate a click
    driver.click('button');
    // makes sure button is clicked
    assert(clicked, 'Button did not handle the click');
  });
});
