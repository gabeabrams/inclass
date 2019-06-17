const assert = require('assert');

const detectCatalogAndPermissions = require('../../../../server/Store/helpers/detectCatalogAndPermissions');
const API = require('../../../dummy-objects/API');

const catalogOne = {
  title: 'catalog 1',
  accounts: [40, 45, 49],
  tagColors: { tagName: 'blue' },
  defaultSupportEmail: 'fake-email@gmail.com',
};
const catalogTwo = {
  title: 'catalog 2',
  accounts: [50, 64, 88, 89],
  tagColors: { tagName: 'red' },
  defaultSupportEmail: 'fake-email@gmail.com',
};
const catalogThree = {
  title: 'catalog 3',
  accounts: [10, 11, 12],
  tagColors: { tagName: 'red' },
  defaultSupportEmail: 'fake@gmail.com',
};
const catalogFour = {
  title: 'catalog 4',
  accounts: [1, 60, 800],
  tagColors: { tagName: 'blue' },
  defaultSupportEmail: 'fake@gmail.com',
};

const catalogs = {
  one: catalogOne,
  two: catalogTwo,
  three: catalogThree,
  four: catalogFour,
};

const noCatalogs = {};

const api = new API();

describe('server > Store > helpers > detectCatalogAndPermissions', function () {
  it('checks correct catalog is found', async function () {
    const launchInfo = { courseId: 100 };
    const match = await detectCatalogAndPermissions(api, launchInfo, catalogs);
    assert.equal(match.catalogId, 'two', 'Catalog Id does not match what is expected');
  });

  it('checks isAdmin is true when person is admin of course they are in', async function () {
    const launchInfo = { courseId: 100 };
    const match = await detectCatalogAndPermissions(api, launchInfo, catalogs);
    assert.equal(match.isAdmin, true, 'iAdmin is false when it should be true');
  });

  it('checks isAdmin is true when person is admin to any account in catalog', async function () {
    const launchInfo = { courseId: 2 };
    const match = await detectCatalogAndPermissions(api, launchInfo, catalogs);
    assert.equal(match.isAdmin, true, 'isAdmin is false when it should be true');
  });

  it('checks isAdmin is false when person does not satisfy admin requirements', async function () {
    const launchInfo = { courseId: 20 };
    const match = await detectCatalogAndPermissions(api, launchInfo, catalogs);
    assert.equal(match.isAdmin, false, 'isAdmin is true when the person is not an admin');
  });

  it('checks error thrown for no catalog for the course', async function () {
    const launchInfo = { courseId: 50 };
    let errorOccurred = false;
    try {
      await detectCatalogAndPermissions(api, launchInfo, catalogs);
    } catch (err) {
      if (err.message.includes('There is no catalog for this course')) {
        // The correct error occurred
        errorOccurred = true;
      } else {
        // Another error occurred that we did not expect
        throw err;
      }
    }

    if (!errorOccurred) {
      throw new Error('This test should have thrown an error for no catalog for course given');
    }
  });

  it('checks error thrown when no catalogs given', async function () {
    const launchInfo = { courseId: 366 };
    let errorOccurred = false;
    try {
      await detectCatalogAndPermissions(api, launchInfo, noCatalogs);
    } catch (err) {
      if (err.message.includes('There is no catalog for this course')) {
        // The correct error occurred
        errorOccurred = true;
      } else {
        // Another error occurred that we did not expect
        throw err;
      }
    }

    if (!errorOccurred) {
      throw new Error('This test should have thrown an error for no catalog for course given');
    }
  });
});
