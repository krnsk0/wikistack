const Sequelize = require('Sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define('Page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'closed'
  }
});

// Removes all non-alphanumeric characters from title and make whitespace underscore
function generateSlug(title) {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}
// Adds a slug
Page.beforeValidate((pageInstance, options) => {
  pageInstance.slug = generateSlug(pageInstance.title);
});

const User = db.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true }
  }
});

module.exports = { db, Page, User };
