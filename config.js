require("dotenv").config();
const { cleanEnv, str, port } = require("envalid");

const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  MONGODB_PASSWORD: str(),
  ACCESS_TOKEN_SECRET: str(),
  REFRESH_TOKEN_SECRET: str(),
});

module.exports = env;
