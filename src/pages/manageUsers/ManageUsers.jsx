import { useState } from 'react';
import './ManageUsers.scss';

export default function ManageUsers() {
  // State for the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for the users list
  const users = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', telephone: '123-456-7890', userType: 'Admin', position: 'Manager' },
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', telephone: '123-456-7890', userType: 'Admin', position: 'Manager' },
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', telephone: '123-456-7890', userType: 'Admin', position: 'Manager' },
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', telephone: '123-456-7890', userType: 'Admin', position: 'Manager' },
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', telephone: '123-456-7890', userType: 'Admin', position: 'Manager' },
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', telephone: '123-456-7890', userType: 'Admin', position: 'Manager' },
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', telephone: '123-456-7890', userType: 'Admin', position: 'Manager' },
    // ... additional users
  ];

  // Function to handle search - for now, it will just log the term
  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
    // Here you would add the logic to filter the displayed users based on the search term
  };

  // Function to remove a user
  const removeUser = (userId) => {
    console.log(`Removing user with ID: ${userId}`);
    // Here you would add the logic to remove the user
  };

  return (
    <div className="manage-users-container">
      <div className="manage-users-header">
        <h1>Manage Users</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>Employee Email</th>
              <th>Telephone Number</th>
              <th>User Type</th>
              <th>Position</th>
              <th></th> {/* This empty header is for the remove button column */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.telephone}</td>
                <td>{user.userType}</td>
                <td>{user.position}</td>
                <td>
                  <button className="remove-button" onClick={() => removeUser(user.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="add-button">Add New User</button>
    </div>
  );
}