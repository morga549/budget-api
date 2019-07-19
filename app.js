const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

dotenv.config();

const expenseRouter = require('./routes/expenses');

const app = express();

app.use(bodyParser.json());

app.use('/expenses', expenseRouter);

app.listen(process.env.PORT);
console.log('Listening on port: ' + process.env.PORT);