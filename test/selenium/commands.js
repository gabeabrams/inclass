const { courseId } = require('../../config/devEnvironment');

module.exports = {
  async launchAppStore() {
    // Visit the launch simulator page
    await this.visit(`https://localhost:8088/courses/${courseId}`);
    // Clicks "Simulate Launch"
    await this.click('.launch-button');
    // Wait for authorization page to (maybe) load
    await this.wait(1000);
    // Clicks "Authorize"
    if (await this.elementExists('.authorize-button')) {
      await this.click('.authorize-button');
    }
    // Waits 2s for server to finish loading
    await this.wait(2000);
    // Visit https://localhost/catalog so session is set up
    await this.visit('https://localhost/catalog');
  },
};