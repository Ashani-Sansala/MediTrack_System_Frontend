import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageUsers.scss';

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    employee_id: '',
    name: '',
    email: '',
    phone_number: '',
    register_as: '',
    position: ''
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/manageUsers/search', {
        params: { name: searchTerm },
      });
      setUsers(response.data);
      setUserCount(response.data.length);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm]);

  const handleSearch = () => {
    fetchUsers();
  };

  const removeUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/manageUsers/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/manageUsers/add', newUser);
      fetchUsers();
      setShowAddUserModal(false);
      setNewUser({
        employee_id: '',
        name: '',
        email: '',
        phone_number: '',
        register_as: '',
        position: ''
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
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
      <div className="user-count">
        <p>Total Users: {userCount}</p>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.employee_id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>{user.register_as}</td>
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
      <button className="add-button" onClick={() => setShowAddUserModal(true)}>Add New User</button>

      {showAddUserModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New User</h2>
            <form>
              <input
                type="text"
                placeholder="Employee ID"
                value={newUser.employee_id}
                onChange={(e) => setNewUser({ ...newUser, employee_id: e.target.value })}
              />
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={newUser.phone_number}
                onChange={(e) => setNewUser({ ...newUser, phone_number: e.target.value })}
              />
              <input
                type="text"
                placeholder="User Type"
                value={newUser.register_as}
                onChange={(e) => setNewUser({ ...newUser, register_as: e.target.value })}
              />
              <input
                type="text"
                placeholder="Position"
                value={newUser.position}
                onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
              />
            </form>
            <div className="modal-buttons">
              <button className="submit-button" onClick={handleAddUser}>Submit</button>
              <button className="close-button" onClick={() => setShowAddUserModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

