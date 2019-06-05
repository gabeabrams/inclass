const callOnSchedule = require('../../../../server/Store/helpers/callOnSchedule');

describe('server > Store > helpers > callOnSchedule', function () {
  it('calls function multiple times', async function () {
    const print = () => {
      console.log('hello');
    };
    callOnSchedule(print, 2);
  });
});

/*
* counter = 0
* const func = () => { counter += 1 }
* const kill = callOnSchedule(func, 200)
*/
// wait 300ms and check if the function was called once
// wait untill 500 ms and check if the function was called twice
// throw an error if not
// kil
