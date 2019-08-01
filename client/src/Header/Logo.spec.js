// Using enzyme
import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import Logo from './Logo';

describe('client > src > Header > Logo', () => {
  it('Displays the AppStore Logo', async () => {
    const driver = new Driver(
      <Logo
        url="https://www.google.com/search?q=harvard+logo&prmd=isnv&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiv_rCRxsfjAhUFuVkKHf3TAKYQ_AUoAXoECBIQAQ&biw=870&bih=701&dpr=2#imgrc=DYmtqTjJwjBb2M"
      />
    );

    const url = 'https://www.google.com/search?q=harvard+logo&prmd=isnv&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiv_rCRxsfjAhUFuVkKHf3TAKYQ_AUoAXoECBIQAQ&biw=870&bih=701&dpr=2#imgrc=DYmtqTjJwjBb2M';
    // Make sure that the logo container is rendered
    await assert(driver.elementExists('.logo-container'), 'Logo container not rendering');
    // Make sure that logo image is rendered
    await assert(driver.elementExists('.logo-image'), 'Logo image not rendering');
    // Make sure url is correct
    const att = driver.getAttributes('.logo-image');
    await assert.equal(att.src, url, 'The url is not correct');
  });
});
