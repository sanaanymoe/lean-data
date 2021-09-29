import React from "react";

const ExpenseReadOnlyRow = ({ user }) => {
  return (
    <>
      {user?.expenses.map((expense, idx) => (
        <tr key={idx}>
          <td>{expense.fullName}</td>
          <td>{expense.category}</td>
          <td>{expense.description}</td>
          <td>{expense.cost}</td>
        </tr>
      ))}
    </>
  );
};

export default ExpenseReadOnlyRow;
