const { submit } = require("./jindou-submit");

submit(
  process.argv.slice(2)[0],
  process.argv.slice(2)[1],
  process.argv.slice(2)[2]
);