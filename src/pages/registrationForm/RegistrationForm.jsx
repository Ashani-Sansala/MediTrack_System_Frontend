import React from 'react';
import './RegistrationForm.css';

function RegistrationForm() {
  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Register New User</h2>
        <table className="registration-table">
          <tbody>
            <tr>
              <td><label>Register as:</label></td>
              <td>
                <div className="checkbox-group">
                  <input type="checkbox" id="administrator" name="administrator" />
                  <label htmlFor="administrator">Administrator</label>
                  <input type="checkbox" id="hospital-staff" name="hospital-staff" />
                  <label htmlFor="hospital-staff">Hospital Staff</label>
                </div>
              </td>
            </tr>
            <tr>
              <td><label>Position:</label></td>
              <td>
                <div className="checkbox-group">
                  <input type="checkbox" id="doctor" name="doctor" />
                  <label htmlFor="doctor">Doctor</label>
                  <span className="space"></span>
                  <input type="checkbox" id="nurse" name="nurse" />
                  <label htmlFor="nurse">Nurse</label>
                </div>
              </td>
            </tr>
            <tr>
              <td><label>Name of the Employee:</label></td>
              <td><input class="input-field" /></td>
            </tr>
            <tr>
              <td><label>Employee ID:</label></td>
              <td><input class="input-field" /></td>
            </tr>
            <tr>
              <td><label>Employee Email:</label></td>
              <td><input class="input-field" /></td>
            </tr>
            <tr>
              <td><label>Phone Number:</label></td>
              <td><input class="input-field" /></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <div className="button-group">
                  <button>Register New User</button>
                  <button>Sent Username & Password</button>
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