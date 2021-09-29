import React from "react";

const ReadOnlyRow = ({ user, handleEditClick, handleDeleteClick }) => {
    let expenses = user.expenses
    let totalExpenses = 0
    for(let expense of expenses){
        totalExpenses += expense.cost
    }
  return (
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{totalExpenses}</td>
      <td>
        <button type="button" onClick={(event) => handleEditClick(event, user)}>
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(user.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
