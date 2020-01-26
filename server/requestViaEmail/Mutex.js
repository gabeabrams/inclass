const locks = require('locks');

class Mutex {
  constructor() {
    this._mutex = locks.createMutex();
  }

  /**
   * Lock the mutex (resolves when the mutex is locked)
   */
  async lock() {
    return new Promise((r) => {
      return this._mutex.lock(r);
    });
  }

  /**
   * Unlock the mutex
   */
  unlock() {
    try {
      this._mutex.unlock();
    } catch (err) {
      if (err.message.includes('Mutex is not locked')) {
        // This is okay (we're allowed to unlock an unlocked mutex)
        return;
      }
      throw err;
    }
  }
}

module.exports = Mutex;
