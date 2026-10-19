const logger = {
  log(level, message, metadata = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...metadata
    };

    console.log(JSON.stringify(entry));
  },

  info(message, metadata = {}) {
    this.log('info', message, metadata);
  },

  warn(message, metadata = {}) {
    this.log('warn', message, metadata);
  },

  error(message, metadata = {}) {
    this.log('error', message, metadata);
  },

  security(event, metadata = {}) {
    this.log('security', event, metadata);
  }
};

module.exports = logger;
