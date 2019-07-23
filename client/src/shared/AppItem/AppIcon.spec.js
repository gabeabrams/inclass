import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppIcon from './AppIcon';

describe('client > src > shared > AppIcon', () => {
  it('Displays the AppIcon', async () => {
    const driver = new Driver(
      // choose an image url from google that is stable long term
      <AppIcon
        appTitle="Harvard Icon"
        iconURL="https://www.google.com/search?q=harvard+logo&prmd=isnv&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiv_rCRxsfjAhUFuVkKHf3TAKYQ_AUoAXoECBIQAQ&biw=870&bih=701&dpr=2#imgrc=DYmtqTjJwjBb2M"
      />
    );
    // check if app icon is rendered on page
    assert(driver.elementExists('.app-icon'), 'did not render correctly');
  });
});
