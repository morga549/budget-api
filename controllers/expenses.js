const pg = require('../db/pg');
const { CONST } = require('../utils/constants');

const createExpense = (amount, category, description, date, user) => {
    return new Promise((resolve, reject) => {
        pg.query(CONST.queries.create_expense, [amount, category, description, date, user])
            .then((result) => {
                let return_val = result.rows;
                return_val.category = category;
                resolve(return_val);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const getExpensesByCategory = (category) => {
    return new Promise((resolve, reject) => {
        pg.query(CONST.queries.get_expenses_by_category, [category])
            .then((result) => {
                resolve(result.rows);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = {
    createExpense: createExpense,
    getExpensesByCategory: getExpensesByCategory
}