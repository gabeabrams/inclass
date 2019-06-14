const sinon = require('sinon');
const callOnSchedule = require('../../../../server/Store/helpers/callOnSchedule');

describe('server > Store > helpers > callOnSchedule', function () {
  before(function () {
    this.clock = sinon.useFakeTimers();
  });

  after(function () {
    this.clock.restore();
  });

  it('calls function on schedule', function () {
    let counter = 1;
    const kill = callOnSchedule(() => {
      counter += 1;
    }, 0.5);
    // At time 0
    if (!counter === 1) {
      kill();
      throw new Error('function was called before timer started');
    }

    // Advance clock 500ms.
    this.clock.tick(500);
    if (!counter === 2) {
      kill();
      throw new Error('function was not called on schedule');
    }

    // Advance clock 500ms again
    this.clock.tick(500);
    if (!counter === 3) {
      kill();
      throw new Error('function was not called on schedule');
    }

    kill();
    // check that the kill function actually kills the recurring calls
    this.clock.tick(1000);
    if (!counter === 3) {
      kill();
      throw new Error('kill function failed to stop recurring calls');
    }
  });
});
