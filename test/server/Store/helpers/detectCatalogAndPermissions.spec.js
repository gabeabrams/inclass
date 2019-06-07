const assert = require('assert');
const detectCatalogAndPermissions = require('../../../../server/Store/helpers/detectCatalogAndPermissions');
const API = require('../../../dummy-objects/API');


const catalogOne = {
  title: 'catalog 1', accounts: [40, 45, 49], tagColors: { tagName: 'blue' }, defaultSupportEmail: 'fake-email@gmail.com',
};
const catalogTwo = {
  title: 'catalog 2', accounts: [50, 64, 88, 89], tagColors: { tagName: 'red' }, defaultSupportEmail: 'fake-email@gmail.com',
};
const catalogThree = {
  title: 'catalog 3', accounts: [100, 99, 400], tagColors: { tagName: 'red' }, defaultSupportEmail: 'fake@gmail.com',
};
const catalogFour = {
  title: 'catalog 4', accounts: [1, 60, 800], tagColors: { tagName: 'blue' }, defaultSupportEmail: 'fake@gmail.com',
};

const catalogs = {
  600: catalogOne, 542: catalogTwo, 4: catalogThree, 300: catalogFour,
};
const api = new API();

describe('server > Store > helpers > detectCatalogAndPermissions', function () {
  it('checks correct catalog is found', async function () {
    const launchInfo = { courseId: 100 };
    const match = detectCatalogAndPermissions(api, launchInfo, catalogs);
    console.log('Match: ', match);
    assert.equal(match.matchCatalogId, 542);
  });

  // it('checks isAdmin is true when person is admin of course they are in', async function () {
  //   const launchInfo = { courseId: 100 };
  //   const match = detectCatalogAndPermissions(api, launchInfo, catalogs);
  //   assert.equal(match.isAdmin, true);
  // });

  // it('checks isAdmin is true when person is admin to any account in catalog', async function () {
  //   const launchInfo = { courseId: };
  //   const match = detectCatalogAndPermissions(api, launchInfo, catalogs);
  //   assert.equal(match.isAdmin, true);
  // });

  // it('checks isAdmin is false when person does not satisfy admin requirements', async function () {
  //   const launchInfo = { courseId: };
  //   const match = detectCatalogAndPermissions(api, launchInfo, catalogs);
  //   assert.equal(match.isAdmin, false);
  // });

  // it('checks no accounts in catalog does not cause an error', async function () {
  //   const launchInfo = { courseId: };
  //   const match = detectCatalogAndPermissions(api, launchInfo, catalogs);
  // });
});
