/**
 * Takes a function and calls it every x seconds
 * @param {function} func - the function to call x seconds
 * @param {number} [delay=60] - number of seconds to wait between calls
 * @return {function} kill function that stops the recurring calls
 */
module.exports = (func, delay = 60) => {
  const delayInMiliseconds = delay * 1000;
  setInterval(func, delayInMiliseconds);
  // TODO: call func every minute from here until kill is called
  const handle = () => {
    setInterval(func, delayInMiliseconds);
  };
  const kill = () => {
    clearInterval(handle);
  };
  return kill;
};
// if function returns a working store, update it, save this as last working version of store