const mysql = require("mysql")
require('dotenv').config();

const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect()

connection.query(`
    CREATE TABLE IF NOT EXISTS workexperience  (
  id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  companyname varchar(100) NOT NULL,
  jobtitle varchar(100) NOT NULL,
  location varchar(30) NOT NULL,
  startdate date NOT NULL,
  enddate date NOT NULL,
  description varchar(500) NOT NULL,
  PRIMARY KEY (id)
)
`);