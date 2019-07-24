import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppTag from './AppTag';

describe('client > src > shared > AppItem > AppTag', () => {
  it('Displays the AppTag', async () => {
    const driver = new Driver(
      <AppTag tagKey="fakeKey" tagValue="fakeValue" tagColor="red" tagUniqueKey="hello=>world" />
    );
    // check if app tag is rendered on page
    assert(driver.elementExists('.apptag-left-side'), 'did not render left side of tag correctly');
    assert(driver.elementExists('.apptag-right-side'), 'did not render right side of tag correctly');
    // check if they rendered the correct corresponding text
    assert.equal(driver.getText('.apptag-left-side'), 'fakeKey', 'did not render correct text in tag key');
    assert.equal(driver.getText('.apptag-right-side'), 'fakeValue', 'did not render correct text in tag value');
  });
});
