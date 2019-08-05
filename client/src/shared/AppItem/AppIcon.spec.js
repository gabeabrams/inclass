import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppIcon from './AppIcon';

describe('client > src > shared > AppIcon', () => {
  it('Displays the AppIcon', async () => {
    const driver = new Driver(
      // choose an image url from google that is stable long term
      const url = 'https://www.google.com/search?q=harvard+logo&prmd=isnv&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiv_rCRxsfjAhUFuVkKHf3TAKYQ_AUoAXoECBIQAQ&biw=870&bih=701&dpr=2#imgrc=DYmtqTjJwjBb2M';
      <AppIcon
        appTitle="Harvard"
        iconURL={url}
      />
    );
    // check if app icon is rendered on page
    assert(driver.elementExists('.app-icon'), 'did not render correctly');
    assert.equal(driver.getAttributes('.app-icon').src, url, 'did not use the correct icon url');
    assert.equal(driver.getAttributes('.app-icon').alt, 'Harvard icon', 'did not generate the correct alt text');
  });
});
