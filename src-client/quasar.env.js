const getEnvironmentByFile = () => {
  const fs = require("fs-extra");
  const packageJson = fs.readJsonSync("../package.json", { throws: true });
  const env = require("dotenv");
  const path = require("path");
  const envPath = path.resolve("../.env");
  const envFileExist = fs.existsSync(envPath);
  if (!envFileExist) {
    console.error("Missing .env file");
    return;
  }
  const resultEnv = env.config({
    path: envPath,
    override: true,
    debug: true,
  });

  if (resultEnv.error) {
    console.error(resultEnv.error);
    return;
  }

  console.log("Environment file: ", resultEnv.parsed);

  if (resultEnv.parsed?.PORT == undefined) {
    console.error("Invalid PORT value");
    return;
  }
  const PORT = parseInt(resultEnv.parsed?.PORT) + 1;

  const APP_WEB_HOST = resultEnv.parsed?.APP_WEB_HOST;
  if (APP_WEB_HOST == undefined) {
    console.error("Invalid APP_WEB_HOST value");
    return;
  }

  const APP_WEB_HOST_DEV = resultEnv.parsed?.APP_WEB_HOST_DEV;
  if (APP_WEB_HOST_DEV == undefined) {
    console.error("Invalid APP_WEB_HOST_DEV value");
    return;
  }

  return {
    PORT,
    APP_WEB_HOST,
    APP_WEB_HOST_DEV,
    VERSION: packageJson.version || "0.0.0",
  };
};

module.exports = getEnvironmentByFile;
