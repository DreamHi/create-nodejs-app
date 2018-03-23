module.exports = {
  name: "template",
  alias: "模版",
  port: process.env.PORT || 3000,
  tokenHeader: "x-token-template",
  tokenSecret: "template",
  tokenLength: 32,
  tokenExpires: 24 * 60 * 60 * 1000, // 24h
};