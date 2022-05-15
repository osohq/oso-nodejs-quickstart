const { Oso, NotFoundError } = require("oso");
const { User, Repository } = require("./models");
const express = require("express");

async function start() {
  const oso = new Oso();
  oso.registerClass(User);
  oso.registerClass(Repository);
  await oso.loadFiles(["main.polar"]);

  const app = express();

  app.get("/repo/:name", async (req, res) => {
    const name = req.params.name;
    const repo = Repository.getByName(name);
    const user = User.getCurrentUser();

    try {
      await oso.authorize(user, "read", repo);
      res.send(`<h1>A Repo</h1><p>Welcome to repo ${repo.name}</p>`);
    } catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404);
        res.send(`<h1>Whoops!</h1><p>Repo named ${name} was not found</p>`);
      } else {
        throw e;
      }
    }
  });
  app.listen(8080, () => console.log("Server running on port 8080"));
}

start();
