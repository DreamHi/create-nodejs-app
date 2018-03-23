const createError = require("http-errors");
const system      = require("./r_system");
const auth        = require("../middleware/auth");
const config      = require("../../config/app");
const response    = require("../core/response");
const log         = require("../core/logger");
const ctrlUser    = require("../modules/system/controllers/ctrl_user");

const appName  = config.name;
module.exports = function(app) {

  app.post(`/${appName}/login`, (req, res) => {
    ctrlUser.simpleLogin(req, res, (err, result) => {
      response.send(req, res, err, result);
    })
  });

  app.use(`/${appName}`, auth.authenticate, system);

  // catch 404 and forward to error handler
  app.all("*", (req, res) => {
    response.send(req, res, new createError.NotFound(), "");
  });

  // error handler for all the applications
  app.use((err, req, res) => {
    log.error(err);
    response.send(req, res, new createError.InternalServerError(), "");
  });
};