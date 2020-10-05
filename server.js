const { createServer } = require('http');
const { inspect } = require('util');
const { Oso } = require('oso');

const { Expense, db } = require('./expense');

async function start() {
  const oso = new Oso();
  oso.registerClass(Expense);
  await oso.loadFile('expenses.polar');

  createServer(async function (req, res) {
    const [, resource, id] = req.url.split('/');
    // Look up the requested expense in our "database"
    const expense = db[parseInt(id)];

    // 404 if the requested path doesn't match /expenses/:id
    // or the requested expense ID doesn't exist in our "database"
    if (resource !== 'expenses' || !expense) {
      res.writeHead(404);
      return res.end('Not Found!');
    }

    const actor = req.headers['user'];
    const action = req.method;

    if (await oso.isAllowed(actor, action, expense)) {
      res.end(inspect(expense));
    } else {
      res.writeHead(403);
      res.end('Not Authorized!');
    }
  }).listen(5050, () => console.log('server running on port 5050'));
}

start();
