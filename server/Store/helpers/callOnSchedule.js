/**
 * Takes a function and calls it every x seconds
 * @param {function} func - the function to call x seconds
 * @param {number} [delay=0.5] - number of seconds to wait between calls
 * @return {funtion} used to kill the timer and stop repeating call
 */
module.exports = (func, delay = 0.5) => {
  const delayInMiliseconds = delay * 1000;
  // calls the function passed in repeatedly with 'delay' miliseconds in between
  const refreshIntervalId = setInterval(func, delayInMiliseconds);
  // kill function that stops the recurring calls
  const kill = () => {
    clearInterval(refreshIntervalId);
  };
  return kill;
};
