const pg = require('../db/pg');
const { CONST } = require('../utils/constants');

const getOverview = (budget_id) => {
    return new Promise((resolve, reject) => {
        pg.query(CONST.queries.get_spent_vs_budgetted, [budget_id])
            .then((result) => {
                resolve(result.rows);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = {
    getOverview: getOverview,
}