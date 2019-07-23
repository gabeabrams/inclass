import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppCreatorTag from './AppCreatorTag';

describe('client > Logo', () => {
  it('Displays the AppStore Logo', async () => {
    const driver = new Driver(
      <Logo
        url="https://www.google.com/search?q=harvard+logo&prmd=isnv&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiv_rCRxsfjAhUFuVkKHf3TAKYQ_AUoAXoECBIQAQ&biw=870&bih=701&dpr=2#imgrc=DYmtqTjJwjBb2M"
      />
    );

    await assert(driver.elementExists('.logo-container'), 'Logo container not rendering');
    await assert(driver.elementExists('.logo-image'), 'Logo image not rendering');
  });
});