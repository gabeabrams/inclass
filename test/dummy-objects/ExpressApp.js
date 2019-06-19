class ExpressApp {
  constructor() {
    this.used = [];
    this.handlers = {}; // path => handler function
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
  _addHandler(path, handler) {
    this.handlers[path] = handler;
  }

  get(path, handler) {
    this._addHandler(path, handler);
  }

  post(path, handler) {
    this._addHandler(path, handler);
  }

  delete(path, handler) {
    this._addHandler(path, handler);
  }

  put(path, handler) {
    this._addHandler(path, handler);
  }

  /**
   * Simulates a response to a specific path using the given req and res
   *   objects
   * @param {string} path - the path to listen to
   * @param {object} req - the request object to pass to the handler
   * @param {object} res - the response object to pass to the handler
   */
  async simulateRequest(path, req, res) {
    await this.handlers[path](req, res);
  }
}
module.exports = ExpressApp;
