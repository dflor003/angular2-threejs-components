import {Injectable} from '@angular/core';

const noop = () => {};
const con: Console = console || {} as any;

// Polyfill console for unsupported browsers
class ConsolePolyfill {

  trace(...args: any[]) : void {
    const target = con.debug || con.log || noop;
    target.apply(con, args);
  }

  debug(...args: any[]): void {
    const target = con.debug || con.log || noop;
    target.apply(con, args);
  }

  info(...args: any[]): void {
    const target = con.info || con.log || noop;
    target.apply(con, args);
  }

  warn(...args: any[]): void {
    const target = con.warn || con.error || con.log || noop;
    target.apply(con, args);
  }

  error(...args: any[]): void {
    const target = con.error || con.log || noop;
    target.apply(con, args);
  }
};

@Injectable()
export class Logger {
  private namespace: string;
  private console: ConsolePolyfill = new ConsolePolyfill();

  constructor() {
    this.namespace = 'DEFAULT';
  }

  static formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  named(namespace: string) {
    const logger = new Logger();
    logger.namespace = namespace;
    return logger;
  }

  trace(message: string, ...args: any[]) : void {
    const formattedMessage = Logger.formatMessage('TRACE', message);
    this.console.trace(formattedMessage, ...args);
  }

  debug(message: string, ...args: any[]): void {
    const formattedMessage = Logger.formatMessage('DEBUG', message);
    this.console.debug(formattedMessage, ...args);
  }

  info(message: string, ...args: any[]): void {
    const formattedMessage = Logger.formatMessage('INFO', message);
    this.console.info(formattedMessage, ...args);
  }

  warn(message: string, ...args: any[]): void {
    const formattedMessage = Logger.formatMessage('WARN', message);
    this.console.warn(formattedMessage, ...args);
  }

  error(message: string, ...args: any[]): void {
    const formattedMessage = Logger.formatMessage('ERROR', message);
    this.console.error(formattedMessage, ...args);
  }
}
