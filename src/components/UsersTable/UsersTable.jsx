import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import ReadOnlyRow from "../ReadOnlyRow/ReadOnlyRow";
import EditableRow from "../EditableRow/EditableRow";

import "./UsersTable.styles.css";
import { Fragment } from "react";

const UsersTable = ({users, setUsers}) => {
  
  const [addFormData, setAddFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const [editUserId, setEditUserId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      id: uuid(),
      firstName: addFormData.firstName,
      lastName: addFormData.lastName,
      expenses: []
    };

    const newUsers = [...users, newUser];
    setUsers(newUsers);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const index = users.findIndex((user) => user.id === editUserId);

    const editedUser = {
      id: editUserId,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      expenses: users[index].expenses
    };

    const newUsers = [...users];


    newUsers[index] = editedUser;

    setUsers(newUsers);
    setEditUserId(null);
  };

  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditUserId(user.id);

    const formValues = {
      firstName: user.firstName,
      lastName: user.lastName,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditUserId(null);
  };

  const handleDeleteClick = (UserId) => {
    const newUsers = [...users];

    const index = users.findIndex((user) => user.id === UserId);

    newUsers.splice(index, 1);

    setUsers(newUsers);
  };

  return (
    <div className="users-table">
      <h1>Users Table</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last Name</th>
              <th>Total Expenses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Fragment key={user.id}>
                {editUserId === user.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    user={user}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      
      <h2>Add a User</h2>
      <form className="add-user-form" onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="firstName"
          required="required"
          placeholder="First name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="lastName"
          required="required"
          placeholder="Last name"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UsersTable;
