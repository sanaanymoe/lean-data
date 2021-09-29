import React from "react";

const CompanyExpensesTable = ({ users }) => {
  let expenses = [];
  let expensesHash = {};
  for (let user of users) {
    for (let expense of user.expenses) {
      expenses.push(expense);
    }
  }

  for (let expense of expenses) {
    let category = expense.category;
    expensesHash[category] = expensesHash[category]
      ? (expensesHash[category] += expense.cost)
      : expense.cost;
  }

  let cats = Object.keys(expensesHash);
  return (
    <>
      <h1>Company Expenses</h1>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((category, idx) => (
            <tr key={idx}>
              <td>{category}</td>
              <td>{expensesHash[category]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CompanyExpensesTable;
