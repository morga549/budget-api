const CONST = {
    params: {
        amount: 'amount',
        category: 'category',
        description: 'description',
        date: 'date',
        user: 'user',
    },
    queries: {
        create_expense: 'INSERT INTO budget.expenses(amount, category, description, date, user_id) VALUES($1,$2,$3,$4,$5) RETURNING id;',
        select_now: 'SELECT NOW();'
    }
};

module.exports = {
    CONST
};
