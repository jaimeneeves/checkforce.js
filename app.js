'use strict';

const createLogger = (() => {
  const LOG_LEVELS = Object.freeze({
    info: 'info',
    warn: 'warn',
    error: 'error',
    security: 'security',
  });

  const RESERVED_FIELDS = new Set([
    'timestamp',
    'level',
    'message',
  ]);

  function validateMessage(message) {
    if (typeof message !== 'string' || !message.trim()) {
      throw new TypeError('A mensagem deve ser uma string não vazia.');
    }
  }

  function validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== 'object' ||
      Array.isArray(metadata)
    ) {
      throw new TypeError('Os metadados devem ser um objeto válido.');
    }
  }

  function sanitizeMetadata(metadata) {
    const result = Object.create(null);

    for (const [key, value] of Object.entries(metadata)) {
      if (
        RESERVED_FIELDS.has(key) ||
        key === '__proto__' ||
        key === 'constructor' ||
        key === 'prototype'
      ) {
        continue;
      }

      result[key] = value;
    }

    return result;
  }

  function write(level, message, metadata = {}) {
    if (typeof level !== 'string' || !level.trim()) {
      throw new TypeError('O nível deve ser uma string não vazia.');
    }

    validateMessage(message);
    validateMetadata(metadata);

    const normalizedLevel = level.trim().toLowerCase();

    const entry = {
      ...sanitizeMetadata(metadata),
      timestamp: new Date().toISOString(),
      level: normalizedLevel,
      message,
    };

    let serialized;

    try {
      serialized = JSON.stringify(entry);
    } catch (error) {
      throw new TypeError(
        'Não foi possível serializar o log em JSON.',
        { cause: error }
      );
    }

    // Direciona erros e eventos de segurança para o canal de erro (stderr),
    // enquanto o restante vai para o canal padrão (stdout).
    if (
      normalizedLevel === LOG_LEVELS.error ||
      normalizedLevel === LOG_LEVELS.security
    ) {
      console.error(serialized);
    } else {
      console.log(serialized);
    }
  }

  function info(message, metadata = {}) {
    write(LOG_LEVELS.info, message, metadata);
  }

  function warn(message, metadata = {}) {
    write(LOG_LEVELS.warn, message, metadata);
  }

  function error(message, metadata = {}) {
    write(LOG_LEVELS.error, message, metadata);
  }

  function security(event, metadata = {}) {
    write(LOG_LEVELS.security, event, metadata);
  }

  return function createLoggerInstance() {
    return Object.freeze({
      info,
      warn,
      error,
      security,
    });
  };
})();

module.exports = createLogger();