document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseTable = document.getElementById('expense-table').querySelector('tbody');

    const loadExpenses = () => {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenseTable.innerHTML = '';
        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.description}</td>
                <td>${expense.amount}</td>
                <td>
                    <button onclick="editExpense(${index})">Edit</button>
                    <button onclick="deleteExpense(${index})">Delete</button>
                </td>
            `;
            expenseTable.appendChild(row);
        });
    };

    const saveExpense = (description, amount) => {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push({ description, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;
        saveExpense(description, amount);
        loadExpenses();
        expenseForm.reset();
    });

    window.editExpense = (index) => {
        const expenses = JSON.parse(localStorage.getItem('expenses'));
        const expense = expenses[index];
        document.getElementById('description').value = expense.description;
        document.getElementById('amount').value = expense.amount;
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        loadExpenses();
    };

    window.deleteExpense = (index) => {
        const expenses = JSON.parse(localStorage.getItem('expenses'));
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        loadExpenses();
    };

    loadExpenses();
});
