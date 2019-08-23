import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import InstallOrUninstallModal from '.';

describe('client > src > Modal > InstallOrUninstallModal', () => {
  it('Displays message before modal if message before exist', () => {
    // build fake isAdmin bool
    const isAdmin = false;

    // build fake current specific app
    const fakeCurrentSpecificApp = {
      title: 'GradeUp',
      subtitle: 'easy grade uploader',
      description: 'longer version of the subtitle',
      creator: 'dce',
      messageBeforeInstall: 'this is message before install',
    };

    // create driver
    const driver = new Driver(
      <InstallOrUninstallModal
        isAdmin={isAdmin}
        currentSpecificApp={fakeCurrentSpecificApp}
        onClose={() => {}}
        catalog="dce"
        showSupportModal={() => {}}
        courseId={123}
        installApp={() => {}}
        uninstallApp={() => {}}
      />
    );
    // check message before modal is displayed
    assert(
      driver.elementExists('.message-before-modal'),
      'did not display message before modal when there is a message before'
    );
  });

  it('Displays request install if request email exist and is not admin', () => {
    // build fake isAdmin bool
    const isAdmin = false;

    // build fake current specific app
    const fakeCurrentSpecificApp = {
      title: 'GradeUp',
      subtitle: 'easy grade uploader',
      description: 'longer version of the subtitle',
      creator: 'dce',
      requestInstallEmail: 'harvard@hvd.edu',
    };

    // create driver
    const driver = new Driver(
      <InstallOrUninstallModal
        isAdmin={isAdmin}
        currentSpecificApp={fakeCurrentSpecificApp}
        onClose={() => {}}
        catalog="dce"
        showSupportModal={() => {}}
        courseId={123}
        installApp={() => {}}
        uninstallApp={() => {}}
      />
    );

    // check request install modal is displayed
    assert(
      driver.elementExists('.request-install-uninstall-modal'),
      'did not display request modal'
    );
  });

  it('Displays install success modal if installation successful', () => {
    // build fake isAdmin bool
    const isAdmin = false;

    // build fake current specific app
    const fakeCurrentSpecificApp = {
      title: 'GradeUp',
      subtitle: 'easy grade uploader',
      description: 'longer version of the subtitle',
      creator: 'dce',
    };

    let clicked = false;
    // build fake install app function
    const installApp = () => {
      clicked = true;
    };

    // create driver
    new Driver(
      <InstallOrUninstallModal
        isAdmin={isAdmin}
        currentSpecificApp={fakeCurrentSpecificApp}
        onClose={() => {}}
        catalog="dce"
        showSupportModal={() => {}}
        courseId={123}
        installApp={installApp}
        uninstallApp={() => {}}
      />
    );
    // check install app is called
    assert(clicked, 'clicked is not called');
  });

  it('Calls uninstall app function when no request email is found', () => {
    // build fake isAdmin bool
    const isAdmin = false;

    // build fake current specific app
    const fakeCurrentSpecificApp = {
      title: 'GradeUp',
      subtitle: 'easy grade uploader',
      description: 'longer version of the subtitle',
      creator: 'dce',
    };
    let clicked = false;
    // create driver
    new Driver(
      <InstallOrUninstallModal
        uninstalling
        isAdmin={isAdmin}
        currentSpecificApp={fakeCurrentSpecificApp}
        onClose={() => {}}
        catalog="dce"
        showSupportModal={() => {}}
        courseId={123}
        installApp={() => {}}
        uninstallApp={() => { clicked = true; }}
      />
    );
    // check uninstall app is called
    assert(clicked, 'clicked is not called');
  });
});
