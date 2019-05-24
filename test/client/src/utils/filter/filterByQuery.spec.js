const assert = require('assert');

const filterByQuery = require('../../../../../client/src/utils/filter/filterByQuery.js');

describe('client > src > utils > filter > filterByQuery', function () {
  const appTest = [
   { title: 'Hi', subtitle: 'lala', description: 'this is a cool app!'},
   { title: 'App2', subtitle: 'HI', description: 'BLEE BLOO HEY!'},
   { title: 'blue', subtitle: 'sam', description: 'a COoL apPlIcAtion'},
  ];

  it('Finds a query in an apps title, subtitle, or description', async function () {

    const queryTest = 'Hi';

    assert.equal(queryTest, filterByQuery(appTest, queryTest)[0].title);
    console.log(filterByQuery(appTest, queryTest));
  });

  it('Returns all apps if query is empty or white space', async function () {

    const queryTest = '    ';

    assert.equal(filterByQuery(appTest, queryTest).length, 3);
  });
});
