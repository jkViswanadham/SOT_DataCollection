const mysql = require('mysql');

const db = mysql.createConnection({
    host:'wound-digitization-database.cwejgvog2er4.ap-southeast-1.rds.amazonaws.com',
    user:'admin',
    password:'shadesofthings123',
    database:'wound'
})

db.connect(function(err){
    if(err){
        console.log('Inside database> mysqlConnection.js DB error')
    }
})

module.exports = db