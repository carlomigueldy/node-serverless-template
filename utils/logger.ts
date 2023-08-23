export enum LogLevel {
  Verbose = "verbose",
  Warning = "warning",
  Error = "error",
  Success = "success",
}

export class Logger {
  name: string;

  level: LogLevel;

  constructor(name: string, logLevel: LogLevel = LogLevel.Verbose) {
    this.name = name;
    this.level = this._parseLogLevel(logLevel);
  }

  _parseLogLevel(value: string) {
    switch (value) {
      case "verbose":
        return LogLevel.Verbose;

      case "warn":
        return LogLevel.Warning;

      case "error":
        return LogLevel.Error;

      case "success":
        return LogLevel.Success;

      default:
        return LogLevel.Verbose;
    }
  }

  verbose(...args: any[]) {
    if (this.level === LogLevel.Verbose) {
      console.info(`${this.name} |`, ...args);
    }
  }

  warn(...args: any[]) {
    if (this.level === LogLevel.Verbose || this.level === LogLevel.Warning) {
      console.warn(`⚠️ ${this.name} |`, ...args);
    }
  }

  error(...args: any[]) {
    if (
      this.level === LogLevel.Verbose ||
      this.level === LogLevel.Error ||
      this.level === LogLevel.Warning
    ) {
      console.error(`🐞 ${this.name} |`, ...args);
    }
  }

  success(...args: any[]) {
    if (
      this.level === LogLevel.Verbose ||
      this.level === LogLevel.Success ||
      this.level === LogLevel.Warning
    ) {
      console.info(`✅ ${this.name} |`, ...args);
    }
  }

  prettify(json: any) {
    return JSON.stringify(json, null, 2);
  }
}

export const getLogger = (name: string) => new Logger(name);
