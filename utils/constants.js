const CONST = {
    params: {
        amount: 'amount',
        category: 'category',
        description: 'description',
        date: 'date',
        user: 'user',
    },
    queries: {
        create_expense: 'INSERT INTO budget.expenses(budget_id, amount, category, description, date, user_id) VALUES(1,$1,$2,$3,$4,$5) RETURNING id;',
        get_expenses_by_category: 'SELECT to_char(date, \'YYYY-MM-DD\') AS date, description, amount FROM budget.expenses WHERE date >= date_trunc(\'month\', CURRENT_DATE) AND category = $1;',
        get_categories: 'SELECT category_name, budgetted_amount FROM budget.categories WHERE budget_id = $1;',
        get_spent_vs_budgetted: 'SELECT category_name, budgetted_amount, coalesce(spent_amount, 0) AS spent from budget.categories AS cats LEFT JOIN (select category, sum(amount) spent_amount from budget.expenses WHERE  budget_id = $1 AND date >= date_trunc(\'month\', CURRENT_DATE) GROUP BY 1 ORDER BY 1) spent ON cats.category_name = spent.category ORDER BY 1;'
    }
};

module.exports = {
    CONST
};