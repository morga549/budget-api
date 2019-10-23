const pg = require('../db/pg');
const { CONST } = require('../utils/constants');

const getCategories = (budget_id) => {
    return new Promise((resolve, reject) => {
        pg.query(CONST.queries.get_categories, [1])
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = {
    getCategories: getCategories,
}