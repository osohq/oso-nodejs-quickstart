/** Run me: npx run-func oso.js initOso */

const { Oso } = require("oso");
const { User, Repository } = require("./models");

async function initOso() {
  const oso = new Oso();
  oso.registerClass(User);
  oso.registerClass(Repository);
  await oso.loadFiles(["main.polar"]);
  return oso;
}

module.exports = { initOso };
