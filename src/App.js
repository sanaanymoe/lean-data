import React, {useState} from "react";

import UsersTable from './components/UsersTable/UsersTable'
import ExpensesTable from './components/ExpensesTable/ExpensesTable'
import CompanyExpensesTable from './components/CompanyExpensesTable/CompanyExpensesTable'

import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  // console.log(users)
  return (
    <div className="App">
      <UsersTable users={users} setUsers={setUsers} />
      <ExpensesTable users={users} setUsers={setUsers}/>
      <CompanyExpensesTable users={users}/>
    </div>
  );
}


export default App;
