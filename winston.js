import winston from "winston";
const { combine, timestamp, printf, label } = winston.format;
import DailyRotateFile from 'winston-daily-rotate-file';

const format = combine(
    label({ label: "Default label" }),
    timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
    })
)
export const winLogger = (dir) => {
    return winston.createLogger({
        level: 'info',
        format: format.JSON,
        defaultMeta: { service: 'user-service' },
        transports: [
            new DailyRotateFile({
                filename: `winstonLogs/${dir}/info-%DATE%.log`,
                level: 'info',
                datePattern: 'DD-MM-YYYY',
                zippedArchive: true,
                maxSize: '30m',
                maxFiles: '30d',
            }),
            new DailyRotateFile({
                filename: `winstonLogs/${dir}/error-%DATE%.log`,
                datePattern: 'DD-MM-YYYY',
                level: 'error',
                zippedArchive: true,
                maxSize: '30m',
                maxFiles: '30d',
            })
        ],
    });
}