const pg = require('../db/pg');
const { CONST } = require('../utils/constants');

const createExpense = (amount, category, description, date, user) => {
    return new Promise((resolve, reject) => {
        pg.query(CONST.queries.create_expense, [amount, category, description, date, user])
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = {
    createExpense: createExpense,
}