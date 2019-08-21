const assert = require('assert');

const filterByQuery = require('../../../../../client/src/utils/filter/filterByQuery.js');

describe.only('client > src > utils > filter > filterByQuery', function () {
  const AppOne = {
    title: 'Hi',
    subtitle: 'lala',
    description: 'this is a cool app!',
  };
  const AppTwo = {
    title: 'App2',
    subtitle: 'HI',
    description: 'BLEE BLOO HEY!',
  };
  const AppThree = {
    title: 'blue',
    subtitle: 'sam',
    description: 'a COoL apPlIcAtion',
  };

  const appTest = {
    AppOne,
    AppTwo,
    AppThree,
  };

  it('Finds a query in an apps title, subtitle, or description', async function () {
    // This tests case insensitivity and the title and subtitle
    let queryTest = 'Hi';
    assert.deepEqual(
      filterByQuery(appTest, queryTest),
      {
        AppOne,
        AppTwo,
      },
      'App list does not match title and subtitle query filtering'
    );

    // This tests case insensitivity in the subtitle
    queryTest = 'SAM';
    assert.deepEqual(
      filterByQuery(appTest, queryTest),
      {
        AppThree,
      },
      'App list does not match case insensitive query filtering'
    );

    // This tests case insensitivity in the description
    queryTest = 'cool';
    assert.deepEqual(
      filterByQuery(appTest, queryTest),
      {
        AppOne,
        AppThree,
      },
      'App list does not match description query filtering'
    );
  });
  it('Returns all apps if query is empty or white space', async function () {
    const queryTest = '    ';
    assert.deepEqual(
      filterByQuery(appTest, queryTest),
      {
        AppOne,
        AppTwo,
        AppThree,
      },
      'App list does not match expected whitespace query filtering'
    );
  });
});
