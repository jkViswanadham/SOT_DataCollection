const express = require('express');
const routes = require('./routes');
const dbconnection = require('./database/mysqlConnection')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);



const PORT = 3000;

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });