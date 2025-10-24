require("dotenv").config();
const { cleanEnv, str, port } = require("envalid");

const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  MONGODB_PASSWORD: str(),
});

module.exports = env;
