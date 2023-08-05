require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8080,
  dbConfig: {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    database: 'mydb',
  },
};
