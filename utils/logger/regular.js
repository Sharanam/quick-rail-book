const consoleTricks = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  black: "\x1b[30m",
  orange: "\x1b[38;5;202m",
  skyblue: "\x1b[38;5;45m",
};

const log = (message, ...args) =>
  console.log(
    consoleTricks.green,
    `[${new Date().toLocaleTimeString()}]\x1b[0m`,
    message,
    ...args
  );

const logError = (error) =>
  log(
    consoleTricks.orange,
    consoleTricks.reverse,
    "Error:",
    consoleTricks.reset,
    consoleTricks.white,
    error.message,
    "\n",
    "Error Stack:\n",
    consoleTricks.dim,
    consoleTricks.reverse,
    consoleTricks.red,
    error.stack.split("\n").slice(1).join("\n"),

    consoleTricks.reset
  );

module.exports = { log, logError, consoleTricks };
