/**
 * @file logger.ts
 * @date 2025-01-20
 * @author Robert Joyce
 * @purpose To configure a logger with different transports for handling and storing logs, including info, error, and console outputs.
 * 
 * @alterations
 * - 2025-01-20: Initial version to configure the logger with daily rotating files and console output.
 * 
 * @usage
 * 1. The logger is configured to log info-level and higher messages to rotating daily files and to the console.
 * 2. Logs are stored in the `logs` directory, with separate subdirectories for `info` and `errors` logs.
 * 3. The `info` logs are rotated daily and compressed, keeping 14 days' worth of logs. Similarly, `error` logs are handled the same way.
 * 4. Console logs display messages with color coding based on log severity (e.g., info, warn, error).
 * 5. To use the logger, simply import it in your other files:
 *    ```typescript
 *    import logger from './path/to/logger';
 *    ```
 *    Then use it to log messages:
 *    ```typescript
 *    logger.info('This is an info message');
 *    logger.error('This is an error message');
 *    logger.warn('This is a warning message');
 *    ```
 * 6. Adjust log levels and transport settings (e.g., max size, retention period) as needed by modifying this file.
 */

import { createLogger, format, transports } from 'winston'; // Import necessary modules from Winston for logging
import DailyRotateFile from 'winston-daily-rotate-file'; // Import DailyRotateFile transport for rotating log files
import fs from 'fs'; // Import fs module to check and create directories
import path from 'path'; // Import path module for working with file and directory paths

// Ensure the logs directory exists, creating it if necessary
const logsDir = path.resolve('logs'); // Define the path for the logs directory
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir); // Create the directory if it doesn't exist
}

// Transport for general info and debug logs, rotating daily
const infoTransport = new DailyRotateFile({
    dirname: path.join(logsDir, 'info'), // Directory for info logs
    filename: 'info-%DATE%.log', // Filename pattern for info logs with date
    datePattern: 'YYYY-MM-DD', // Date format for the log file names
    zippedArchive: true, // Compress old log files
    maxSize: '20m', // Maximum log file size before rotating
    maxFiles: '14d', // Retain logs for 14 days
    level: 'info', // Log level for this transport (info and below)
});

// Transport for warnings and errors, rotating daily
const errorTransport = new DailyRotateFile({
    dirname: path.join(logsDir, 'errors'), // Directory for error logs
    filename: 'error-%DATE%.log', // Filename pattern for error logs with date
    datePattern: 'YYYY-MM-DD', // Date format for the log file names
    zippedArchive: true, // Compress old log files
    maxSize: '20m', // Maximum log file size before rotating
    maxFiles: '14d', // Retain logs for 14 days
    level: 'error', // Log level for this transport (error and above)
});

// Transport for console output, with colored logs
const consoleTransport = new transports.Console({
    format: format.combine(
        format.colorize(), // Adds color to console output based on log level
        format.printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`) // Log format for console output
    ),
});

// Logger configuration, combining multiple transports
const logger = createLogger({
    level: 'info', // Default log level
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Timestamp format for logs
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`) // Log message format
    ),
    transports: [
        infoTransport, // Transport for info level logs
        errorTransport, // Transport for error level logs
        consoleTransport, // Transport for console output
    ],
});

export default logger; // Export the logger for use in other files
