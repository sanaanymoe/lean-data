import React, { useState } from "react";
import './ExpensesTable.styles.css'

import ExpenseReadOnlyRow from "../ExpenseReadOnlyRow/ExpenseReadOnlyRow";

const ExpensesTable = ({ users, setUsers }) => {
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [index, setIndex] = useState(undefined);

  const [addFormData, setAddFormData] = useState({
    fullName: "",
    category: "",
    description: "",
    cost: 0,
  });

  const handleTextFieldsChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleSelectUser = (e) => {
    // const user = users.filter((user) => user.id === e.target.value)[0];
    setIndex(e.target.value);
    const user = users[e.target.value];
     setSelectedUser(user);

    const newFormData = { ...addFormData };
    newFormData["fullName"] = user.firstName + " " + user.lastName;
    setAddFormData(newFormData);
  };

  const handleSelectCategory = (e) => {
    setCategory(e.target.value);

    const newFormData = { ...addFormData };
    // console.log("newFormData", newFormData);
    newFormData["category"] = e.target.value;

    setAddFormData(newFormData);
  };

  const handleAddExpenseSubmit = (event) => {
    event.preventDefault();

    const newExpense = {
      fullName: addFormData.fullName,
      category: addFormData.category,
      description: addFormData.description,
      cost: Number(addFormData.cost),
    };

    const newExpenses = [...expenses, newExpense];
    setExpenses(newExpenses);
    const updatedUser = {
      id: selectedUser.id,
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      expenses: expenses,
    };

    const updatedUsers = [...users];
    updatedUsers[index] = updatedUser;
    setUsers(updatedUsers);
  };

  return (
    <div className="expense-table">
      <h1>Expenses Table</h1>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <ExpenseReadOnlyRow user={user} key={idx}/>
          ))}
        </tbody>
      </table>
      <h2>Add Expense</h2>

      <form className="expense-form" onSubmit={handleAddExpenseSubmit}>
        <select defaultValue="DEFAULT" onChange={handleSelectUser}>
          <option value="DEFAULT" disabled>
            Select a user
          </option>
          {users?.map((user, idx) => (
            <option key={idx} value={idx}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>

        <select defaultValue="DEFAULT" onChange={handleSelectCategory}>
          <option value="DEFAULT" disabled>
            Category
          </option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="health">Health</option>
          <option value="supplies">Supplies</option>
        </select>

        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleTextFieldsChange}
        />
        <input
          type="number"
          name="cost"
          placeholder="Cost"
          onChange={handleTextFieldsChange}
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpensesTable;
