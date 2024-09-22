const mysql = require("mysql");

const db = mysql.createConnection({
  host: "api.bemfebunpad.my.id",
  user: "bemfebun_admin",
  password: "Cc,yzEXQenK9",
  database: "bemfebun_db_bemfeb",
});

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "db_bemfeb",
// });

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

module.exports = db;
