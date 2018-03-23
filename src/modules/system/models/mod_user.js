const SchemaCommon    = require("../../mod_base");
const { BaseSchema } = SchemaCommon;

const User = new BaseSchema({
  email:           { type: String, description: "邮箱" },
  password:        { type: String, description: "密码" },
  name:            { type: String, description: "用户名" },
});

module.exports = User;