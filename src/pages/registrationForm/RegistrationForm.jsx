import React, { useState } from 'react';
import './RegistrationForm.scss';
import axios from 'axios';

function RegistrationForm() {
  const [newUser, setNewUser] = useState({
    employee_id: '',
    name: '',
    email: '',
    phone_number: '',
    register_as: '',
    position: ''
  });

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/manageUsers/add', newUser);
      alert('User added successfully!');
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
      alert('An error occurred while adding the user. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Register New User</h2>
        <table className="registration-table">
          <tbody>
            <tr>
              <td><label>Register as:</label></td>
              <td>
                <div className="radio-group">
                  <input
                    type="radio"
                    id="administrator"
                    name="register_as"
                    value="Administrator"
                    checked={newUser.register_as === 'Administrator'}
                    onChange={(e) => setNewUser({ ...newUser, register_as: e.target.value })}
                  />
                  <label htmlFor="administrator">Administrator</label>
                  <input
                    type="radio"
                    id="hospital-staff"
                    name="register_as"
                    value="Hospital Staff"
                    checked={newUser.register_as === 'Hospital Staff'}
                    onChange={(e) => setNewUser({ ...newUser, register_as: e.target.value })}
                  />
                  <label htmlFor="hospital-staff">Hospital Staff</label>
                </div>
              </td>
            </tr>
            <tr>
              <td><label>Position:</label></td>
              <td>
                <div className="radio-group">
                  <input
                    type="radio"
                    id="doctor"
                    name="position"
                    value="Doctor"
                    checked={newUser.position === 'Doctor'}
                    onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
                  />
                  <label htmlFor="doctor">Doctor</label>
                  <input
                    type="radio"
                    id="nurse"
                    name="position"
                    value="Nurse"
                    checked={newUser.position === 'Nurse'}
                    onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
                  />
                  <label htmlFor="nurse">Nurse</label>
                </div>
              </td>
            </tr>
            <tr>
              <td><label>Name of the Employee:</label></td>
              <td><input className="input-field" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} /></td>
            </tr>
            <tr>
              <td><label>Employee ID:</label></td>
              <td><input className="input-field" value={newUser.employee_id} onChange={(e) => setNewUser({ ...newUser, employee_id: e.target.value })} /></td>
            </tr>
            <tr>
              <td><label>Employee Email:</label></td>
              <td><input className="input-field" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} /></td>
            </tr>
            <tr>
              <td><label>Phone Number:</label></td>
              <td><input className="input-field" value={newUser.phone_number} onChange={(e) => setNewUser({ ...newUser, phone_number: e.target.value })} /></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <div className="button-group">
                  <button onClick={handleAddUser}>Register New User</button>
                  <button>Send Username & Password</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegistrationForm;
