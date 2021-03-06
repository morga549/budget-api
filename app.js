global.baseDir = __dirname;
const express = require('express');
const bodyParser = require('body-parser');

const expenseRouter = require('./routes/expenses');
const categoryRouter = require('./routes/categories');
const overviewRouter = require('./routes/overview');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('UP');
});

app.use('/expenses', expenseRouter);
app.use('/categories', categoryRouter);
app.use('/overview', overviewRouter);   


app.listen(process.env.PORT);
console.log('NODE_ENV: ', process.env.NODE_ENV)
console.log('Listening on port: ' + process.env.PORT);
