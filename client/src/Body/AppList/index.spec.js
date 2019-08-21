import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppList from '.';

describe('client > src > Body > AppList', () => {
  // fake apps to pass into appList
  const fakeApps = {
    gradeup: {
      title: 'GradeUp',
      subtitle: 'greade up is a great tool',
      creator: ['dce'],
      icon: {
        url: '/public/dce/gradeup/icon',
      },
      appId: 'gradeup',
      supportEmail: 'example@harvard.edu',
      tags: {
        cost: ['free'],
        type: ['grading'],
      },
    },
    notInstalled: {
      title: 'NotInstalled',
      subtitle: 'not installed is not a great tool',
      creator: ['dce'],
      appId: 'notinstalled',
      icon: {
        url: '/public/dce/notinstalled/icon',
      },
      tags: {
        cost: ['expensive', 'cheap'],
        type: ['attendance'],
      },
    },
  };

  // fake tagColor to pass into appList
  const fakeTagColors = {
    cost: {
      color: 'blue',
    },
    type: {
      color: 'red',
    },
  };

  // fake StoreHost to pass into appList
  const fakeStoreHost = 'localhost';

  it('Displays the AppList', async () => {
    const driver = new Driver(
      <AppList
        apps={fakeApps}
        tagColors={fakeTagColors}
        storeHost={fakeStoreHost}
        onAppSelected={() => {}}
        isFiltering
      />
    );
    // displays the appListStatusBar
    assert(driver.elementExists('.app-list-status-bar-container'), 'did not render appListStatusBar in appList');
    // displays two appItems
    assert(driver.elementExists('.app-list-container'), 'did not render app list');
    const appListHTML = driver.getHTML('.app-list-container');
    const appCount = (appListHTML.match(/appitem-container/g) || []).length;
    assert.equal(appCount, 2, 'did not display the correct number of apps');
  });
});
