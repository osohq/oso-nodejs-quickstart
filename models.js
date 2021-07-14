class Page {
  pages = [];

  constructor(pagenum) {
    this.pagenum = pagenum;
  }

  static getPage(pagenum) {
    const num = parseInt(pagenum);
    if (num < Page.pages.length) {
      return Page.pages[num];
    } else {
      return undefined;
    }
  }
}

Page.pages = [new Page(0), new Page(1), new Page(2)];

ROLES = {
  alice: [
    { name: 'guest', resource: Page.pages[0] },
    { name: 'admin', resource: Page.pages[1] }
  ],
  bob: [{ name: 'admin', resource: Page.pages[2] }]
};

class User {
  constructor(name) {
    this.name = name;
  }

  static getCurrentUser() {
    return new User('bob');
  }

  getRoles() {
    return ROLES[this.name];
  }
}
module.exports = {
  Page,
  User
};
