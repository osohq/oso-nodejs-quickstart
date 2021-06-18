const { Oso } = require('oso');
const express = require('express')
const { Page, User } = require("./models")

const oso = new Oso()
// oso.enableRoles()
oso.registerClass(Page)
oso.registerClass(User)
oso.loadFile("authorization.polar")

const app = express()
const port = 3000

app.get('/page/:pageNum', async (req, res) => {
  const pageNum = req.params.pageNum
  const page = Page.getPage(pageNum)
  const user = User.getCurrentUser()
  if (await oso.isAllowed(user, "read", page)) {
    res.send(`<h1>A Page</h1><p>this is page ${page.pagenum}</p>`)
  } else {
    res.status(403)
    res.send('<h1>Sorry</h1><p>You are not allowed to see this page</p>')
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = {
  app
};