let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'database_hokben_kw',
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Koneksi Berhasil');
  }
})

module.exports = connection; 