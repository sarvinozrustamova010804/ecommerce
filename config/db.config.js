const mysql = require('mysql2')
const env = require('./env.config')

const db = mysql.createConnection({
    host: env.DB_HOST,
    user:env.DB_USER,
    password:env.DB_PASS,
    database:env.DB_NAME,
    port:env.DB_PORT,
    
}).promise()

module.exports=db