const mysql = require("mysql");

const db = mysql.createConnection({
  host: "api.bemfebunpad.my.id", // Sesuaikan dengan host database Anda
  user: "bemfebun_admin", // Sesuaikan dengan user database Anda
  password: "Cc,yzEXQenK9", // Sesuaikan dengan password database Anda
  database: "bemfebun_db_bemfeb", // Nama database yang akan Anda gunakan
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
