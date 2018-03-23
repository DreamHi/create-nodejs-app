const constant  = require("./constant");
const mongoose  = require("mongoose");
const db        = require("./db");

class Model {
  constructor(code, name, scheme) {
    let conn = db.createConnection(code);
    this.m = conn.model(name, scheme);
  }

  create(obj, callback) {
    new this.m(obj).save(callback);
  }

  remove(id, obj = {}, callback) {
    obj.valid = constant.INVALID;
    this.m.findByIdAndUpdate(id, obj, callback)
  }

  removeByCondition(condition, obj = {}, options, callback) {
    obj.valid = constant.INVALID;
    this.m.update(condition, obj, options, callback);
  }

  delete(condition, callback) {
    this.m.remove(condition, callback);
  }

  update(id, obj, callback) {
    this.m.findByIdAndUpdate(id, obj, callback);
  }

  updateByCondition(condition, obj, options, callback) {
    this.m.update(condition, obj, options, callback);
  }

  get(id, projection = "", callback) {
    this.m.findById(id, projection, callback);
  }

  getOne(condition, projection = "", callback) {
    this.m.findOne(condition, projection, callback);
  }

  count(condition, callback) {
    this.m.count(condition, callback);
  }

  getList(condition, projection,
          skip = constant.MOD_FIND_DEFAULT_SKIP,
          limit = constant.MOD_FIND_DEFAULT_LIMIT,
          sort = "", callback) {
    this.m.find(condition)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec(callback);
  }
}

module.exports = Model;