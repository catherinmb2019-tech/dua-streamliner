export class Logger {
  private static instance: Logger;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Logger();
    }
    return this.instance;
  }

  log(msg: string) {
    console.log("[LOG]:", msg);
  }
}