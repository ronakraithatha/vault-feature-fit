import winston from 'winston'

const logger = winston.createLogger({
	level: 'debug',
	format: winston.format.json(),
	defaultMeta: { service: 'vault-feature-fit' },
	transports: [new winston.transports.Console()],
	format: winston.format.combine(winston.format.colorize({ all: true }), winston.format.simple()),
})

export default logger