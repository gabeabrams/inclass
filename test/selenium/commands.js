const { courseId } = require('../../config/devEnvironment');

module.exports = {
  async launchAppStore() {
    // Visit the launch simulator page
    await this.visit(`https://localhost:8088/courses/${courseId}`);
    // Clicks "Simulate Launch"
    try {
      await this.click('.launch-button');
      // Wait for authorization page to (maybe) load
      await this.wait(1000);
      // Clicks "Authorize"
      if (await this.elementExists('.authorize-button')) {
        await this.click('.authorize-button');
      }
    } catch (err) {
      const clientNotRunning = err.message.includes('Reached error page: about:neterror?e=connectionFailure');
      if (!clientNotRunning) {
        throw err;
      }
    }
    // Waits 2s for server to finish loading
    await this.wait(2000);
    // Visit https://localhost/catalog so session is set up
    await this.visit('https://localhost/catalog');
  },
};
