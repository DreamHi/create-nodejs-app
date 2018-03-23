const util       = require("util");
const mongoose   = require("mongoose");

const { Schema } = mongoose;
const { ObjectId, Mixed }   = Schema.Types;

const Base = {
  valid:            { type: Number, description: "数据状态 0:伦理删除 1:正常利用", default: 1 },
  createdAt:        { type: Date,   description: "作成日" },
  createdBy:        { type: Mixed,  description: "作成者" },
  updatedAt:        { type: Date,   description: "更新日" },
  updatedBy:        { type: Mixed,  description: "更新者" }
};

function BaseSchema() {
  Schema.apply(this, arguments);

  this.add(Base);
}
util.inherits(BaseSchema, Schema);

const FileRefs = new Schema({
  _id:            { type: ObjectId,   description: "文件ID,保存在s3上的文件名" },
  name:           { type: String,     description: "文件名" }
});


exports.BaseSchema = BaseSchema;
exports.FileRefs = FileRefs;