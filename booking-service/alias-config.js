const path = require("path");
const moduleAlias = require("module-alias");

// Set up alias paths based on environment variables
const aliasCommonPath =
  process.env.NODE_ENV === "development"
    ? path.resolve(__dirname, "../common")
    : path.resolve(__dirname, "common");

const aliasConfigPath =
  process.env.NODE_ENV === "development"
    ? path.resolve(__dirname, "../config.js")
    : path.resolve(__dirname, "config.js");

moduleAlias.addAliases({
  "@common": aliasCommonPath,
  "@config": aliasConfigPath,
});
