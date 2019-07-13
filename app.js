const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

const expenseRouter = require('./routes/expenses');

const app = express();

app.use(bodyParser.json());

app.use('/expenses', expenseRouter);

app.listen(process.env.PORT);