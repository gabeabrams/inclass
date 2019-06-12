class ExpressApp {
  constructor() {
    this.used = [];
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
}
module.exports = ExpressApp;
