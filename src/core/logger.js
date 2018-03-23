const Log4js     = require("log4js");
const constant   = require("./constant");
const helper     = require("./helper");

Log4js.configure(process.cwd() + "/config/log4js.json");

const application = Log4js.getLogger("application");
const error = Log4js.getLogger("error");
const access = Log4js.getLogger("access");
const operation = Log4js.getLogger("operation");

exports.debug = (message, user) => application.debug(formatLog(message, user));

exports.warn = (message, user) => application.warn(formatLog(message, user));

exports.info = (message, user) => application.info(formatLog(message, user));

exports.error = (message, user) => {
  error.error(formatLog(message, user));
};

exports.operation = (action, message, user) => operation.info(formatOpLog(action, message, user));

exports.access = access;

function stack(self) {

  let orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack) {
    return stack;
  };

  let err = new Error();
  Error.captureStackTrace(err, self);

  let result = err.stack;
  Error.prepareStackTrace = orig;

  return result;
}

function lineNo() {
  return stack(stack)[3].getLineNumber();
}

function fileName() {
  return stack(stack)[3].getFileName();
}

// function functionName() {
//   return stack(stack)[3].getFunctionName();
// }

function formatOpLog (action, message, user="") {
  let host = helper.ip();
  let name = "";
  if (user) {
    name = `${user.name || ""}(${user.userName || ""})`
  }

  return `[${host}] [${name}] [${action}] [${message}]`;
}

function formatLog(message, user="") {
  let host = helper.ip();
  let file = fileName();
  let line = lineNo();
  let name = "";
  if (user) {
    name = `${user.name || ""}(${user.userName || ""})`
  }
  return `${message} [${name}] [${host}] [${file}] [${line}]`;
}