const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Moscas@132',
    database: 'meuprojeto01'
})

module.exports = pool