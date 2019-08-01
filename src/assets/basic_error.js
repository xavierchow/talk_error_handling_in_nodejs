const logger = getLogger();
const debug = require("debug")("foo:bar");
const ServiceError = require("ServiceError");
function fn(param) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      if (param !== "foo") {
        return reject(new Error("param is not foo!"));
      }
      return resolve();
    }, 1000);
  });
}

fn.catch(e => {
  console.log("fn returns error: %s", e);
});
fn.catch(e => {
  debug("fn returns error: %s", e);
});
fn.catch(e => {
  logger.error("fn returns error: %s", e);
});
fn.catch(e => {
  logger.error("fn returns error: %s", e);
  throw e;
});

function getLogger() {
  return "logger";
}
