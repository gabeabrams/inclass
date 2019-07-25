import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppItem from '.';

describe('client > src > shared > AppItem', () => {
  // fake app to pass into appItem
  const fakeApp = {
    title: 'GradeUp',
    subtitle: 'greade up is a great tool',
    creator: ['dce'],
    icon: {
      fullPath: '/Users/shihanli/Desktop/inclass/test/dummy-data/store/installable/dce/gradeup/icon.png',
      url: '/public/dce/gradeup/icon',
    },
    supportEmail: 'example@harvard.edu',
    tags: {
      cost: ['free'],
      type: ['grading'],
    },
  };
  // fake tagColor to pass into appItem
  const fakeTagColor = {
    cost: {
      color: 'blue',
    },
    type: {
      color: 'red',
    },
  };
  // fake StoreHost to pass into appItem
  const fakeStoreHost = 'localhost';

  it('Displays the AppItem', async () => {
    const driver = new Driver(
      <AppItem
        app={fakeApp}
        tagColors={fakeTagColor}
        storeHost={fakeStoreHost}
      />
    );
    // displays the app title
    const appTitle = driver.getText('.app-title');
    assert.equal(appTitle, fakeApp.title, 'app title did not render correctly');
    // displays the app subtitle
    const appSubtitle = driver.getText('.app-subtitle');
    assert.equal(appSubtitle, fakeApp.subtitle, 'app subtitle did not render correctly');
    // displays the app tags
    const appTagsHTML = driver.getHTML('.apptags-tags-list');
    const tagsCount = (appTagsHTML.match(/apptag-single-tag/g) || []).length;
    assert.equal(tagsCount, 2, 'app tags did not render correctly');
    // displays the app icon
    const appIconHTML = driver.getHTML('.app-icon');
    assert(appIconHTML.includes('<img'), 'app icon did not render correctly');
    // displays the app creator tag
    const appCreatorTag = driver.getText('.appcreatortag-box');
    assert.equal(appCreatorTag, 'by dce', 'app creator tag did not render correctly');
  });
});
