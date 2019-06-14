class ExpressApp {
  constructor() {
    this.used = [];
    this.getHandlers = {}; // path => handler function
  }

  use(path, handler) {
    this.used.push({
      path,
      handler,
    });
  }

  /* eslint-disable class-methods-use-this */
  static(path, options) {
    return {
      isStaticHandler: true,
      path,
      options,
    };
  }

  /**
   * Simulate start listening to a path
   * @param {string} path - the path to listen to
   * @param {function} handler - the function to call when the path is hit
   */
  get(path, handler) {
    this.getHandlers[path] = handler;
  }

  /**
   * Simulates a GET response to a specific path using the given req and res
   *   objects
   * @param {string} path - the path to listen to
   * @param {object} req - the request object to pass to the handler
   * @param {object} res - the response object to pass to the handler
   */
  async simulateGETRequest(path, req, res) {
    await this.getHandlers[path](req, res);
  }
}
module.exports = ExpressApp;
