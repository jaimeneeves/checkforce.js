"use strict";

const os = require("node:os");

const LOG_LEVELS = Object.freeze({
	info: 30,
	warn: 40,
	error: 50,
	security: 60,
});

const RESERVED_FIELDS = new Set([
	"timestamp",
	"level",
	"severity",
	"message",
	"hostname",
	"pid",
]);

const SENSITIVE_FIELDS = new Set([
	"password",
	"token",
	"accessToken",
	"refreshToken",
	"authorization",
	"secret",
	"apiKey",
	"creditCard",
]);

const HOSTNAME = os.hostname();
const PID = process.pid;

function isPlainObject(value) {
	return (
		value !== null &&
		typeof value === "object" &&
		!Array.isArray(value)
	);
}

function validateMessage(message) {
	if (typeof message !== "string" || !message.trim()) {
		throw new TypeError(
			"A mensagem deve ser uma string não vazia.",
		);
	}

	return message.trim();
}

function validateMetadata(metadata) {
	if (!isPlainObject(metadata)) {
		throw new TypeError(
			"Os metadados devem ser um objeto válido.",
		);
	}
}

function serializeError(error) {
	return {
		name: error.name,
		message: error.message,
		stack: error.stack,
		cause:
			error.cause instanceof Error
				? serializeError(error.cause)
				: error.cause,
	};
}

function sanitizeValue(key, value) {
	if (SENSITIVE_FIELDS.has(key)) {
		return "[REDACTED]";
	}

	if (value instanceof Error) {
		return serializeError(value);
	}

	if (typeof value === "bigint") {
		return value.toString();
	}

	if (Array.isArray(value)) {
		return value.map((item) =>
			sanitizeValue(key, item),
		);
	}

	if (isPlainObject(value)) {
		return sanitizeMetadata(value);
	}

	return value;
}

function sanitizeMetadata(metadata) {
	const result = Object.create(null);

	for (const [key, value] of Object.entries(metadata)) {
		if (
			RESERVED_FIELDS.has(key) ||
			key === "__proto__" ||
			key === "prototype" ||
			key === "constructor"
		) {
			continue;
		}

		result[key] = sanitizeValue(key, value);
	}

	return result;
}

function createLogger(context = {}) {
	const baseContext = Object.freeze(
		sanitizeMetadata(context),
	);

	function write(severity, message, metadata = {}) {
		validateMetadata(metadata);

		const normalizedMessage =
			validateMessage(message);

		const level = severity.toLowerCase();

		if (!(level in LOG_LEVELS)) {
			throw new TypeError(
				`Nível inválido: ${severity}`,
			);
		}

		const entry = {
			timestamp: new Date().toISOString(),

			level,
			severity: LOG_LEVELS[level],

			message: normalizedMessage,

			pid: PID,
			hostname: HOSTNAME,

			...baseContext,
			...sanitizeMetadata(metadata),
		};

		let payload;

		try {
			payload = `${JSON.stringify(entry)}\n`;
		} catch (error) {
			throw new TypeError(
				"Falha ao serializar log.",
				{ cause: error },
			);
		}

		const stream =
			level === "error" ||
			level === "security"
				? process.stderr
				: process.stdout;

		stream.write(payload);
	}

	return Object.freeze({
		child(context = {}) {
			validateMetadata(context);

			return createLogger({
				...baseContext,
				...context,
			});
		},

		info(message, metadata = {}) {
			write("info", message, metadata);
		},

		warn(message, metadata = {}) {
			write("warn", message, metadata);
		},

		error(message, metadata = {}) {
			write("error", message, metadata);
		},

		security(message, metadata = {}) {
			write("security", message, metadata);
		},
	});
}

module.exports = createLogger();
