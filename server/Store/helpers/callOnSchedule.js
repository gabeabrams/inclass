/**
 * Takes a function and calls it every x miliseconds
 * @param {function} func - the function to call x miliseconds
 * @param {number} [delay=500] - number of miliseconds to wait between calls
 * @return {Interval Id} used to kill the timer and stop repeating call
 */
module.exports = async (func, delay = 500) => {
  const refreshIntervalId = setInterval(func, delay);
  const kill = () => {
    clearInterval(refreshIntervalId);
  };
  return kill;
};
