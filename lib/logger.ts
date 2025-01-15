import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';
import path from 'path';

// Ensure logs directory exists
const logsDir = path.resolve('logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Transport for general info and debug logs
const infoTransport = new DailyRotateFile({
    dirname: path.join(logsDir, 'info'),
    filename: 'info-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info', // Handles 'info' and lower levels (e.g., 'debug')
});

// Transport for warnings and errors
const errorTransport = new DailyRotateFile({
    dirname: path.join(logsDir, 'errors'),
    filename: 'error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error', // Handles only 'error' and higher levels (e.g., 'fatal')
});

// Combined transport for console output
const consoleTransport = new transports.Console({
    format: format.combine(
        format.colorize(), // Adds colors to console output
        format.printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`)
    ),
});

// Logger configuration
const logger = createLogger({
    level: 'info', // Default level
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        infoTransport,
        errorTransport,
        consoleTransport,
    ],
});

export default logger;
