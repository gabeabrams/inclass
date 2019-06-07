const assert = require('assert');
const sinon = require('sinon');
const callOnSchedule = require('../../../../server/Store/helpers/callOnSchedule');

const aFuncShouldBeRunned = sinon.spy();

describe.only('testing scheduled function calls', function () {
  before(function () {
    this.clock = sinon.useFakeTimers();
  });

  after(function () {
    this.clock.restore();
  });

  it('calls function on time', function () {
    let counter = 1;
    const kill = callOnSchedule(() => {
      if (counter === 3) {
        aFuncShouldBeRunned();
      }
      if (counter === 5) {
        aFuncShouldBeRunned();
      }
      counter += 1;
      console.log(counter);
    }, 500);
    // At time 0, we don't expect the function to have been called.
    assert(aFuncShouldBeRunned.called === false, 'function was called before timer started');
    // Advance clock 500ms.
    this.clock.tick(500);
    assert(aFuncShouldBeRunned.called === false, 'function was called prematurely');

    // Advance clock again (1s since start)
    this.clock.tick(500);
    assert(aFuncShouldBeRunned.called === false, 'function was called prematurely');

    // Advance clock again (1.5s since start). This should
    // trigger the call to `aFuncShouldBeRunned`.
    this.clock.tick(500);
    assert(aFuncShouldBeRunned.called === true, 'function was not called on schedule');
    this.clock.tick(1000);
    assert(aFuncShouldBeRunned.calledTwice, 'function was not called on schedule');
    // kill();
  });

  // it('stops the recurring call when killed', function () {
  //   before();
  //   console.log(this.clock);
  //   let counter = 1;
  //   const kill = callOnSchedule(() => {
  //     if (counter === 3) {
  //       aFuncShouldBeRunned();
  //     }
  //     if (counter === 5) {
  //       aFuncShouldBeRunned();
  //     }
  //     counter += 1;
  //     console.log(counter);
  //   }, 500);
  //   // At time 0, we don't expect the function to have been called.
  //   assert(aFuncShouldBeRunned.called === false, 'function was called before timer started');
  //   // Advance clock 500ms.
  //   this.clock.tick(500);
  //   assert(aFuncShouldBeRunned.called === false, 'function was called prematurely');

  //   // Advance clock again (1s since start)
  //   this.clock.tick(500);
  //   assert(aFuncShouldBeRunned.called === false, 'function was called prematurely');

  //   // Advance clock again (1.5s since start). This should
  //   // trigger the call to `aFuncShouldBeRunned`.
  //   this.clock.tick(500);
  //   assert(aFuncShouldBeRunned.called === true, 'function was not called on schedule');
  //   this.clock.tick(1000);
  //   assert(aFuncShouldBeRunned.calledTwice, 'function was not called on schedule');
  //   // kill();
  //   after();
  // });
});
