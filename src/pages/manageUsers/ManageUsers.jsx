import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ManageUsers.scss';

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const navigate = useNavigate();

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

  const handleAddUser = () => {
    navigate('/logged/RegistrationForm');
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
      <button className="add-button" onClick={handleAddUser}>Add New User</button>
    </div>
  );
}
