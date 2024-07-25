import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import dayjs from 'dayjs'; 
import { Table, Input, Button, Modal, Form, Select, message, Popconfirm, DatePicker, Tooltip } from 'antd'; 
import { ReloadOutlined, DeleteOutlined } from '@ant-design/icons'; 
import { 
  usernameRules, nameRules, emailRules, passwordRules, birthdayRules, phoneNoRules, positionRules, disableFutureDates 
} from '../../utils/ValidationRules'; 
import encrypt from '../../utils/Encryption'; 
import './ManageUsers.scss'; 

const api_url = import.meta.env.VITE_API_URL; // Fetching API URL from environment variables
const admin_category = import.meta.env.VITE_ADMIN_CAT; // Fetching admin user ID from environment variables

const dateFormat = 'YYYY-MM-DD'; // Date format for date pickers

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState(''); // State for search term input
  const [users, setUsers] = useState([]); // State for users data
  const [userCount, setUserCount] = useState(0); // State for total user count
  const [showAddUserModal, setShowAddUserModal] = useState(false); // State to control visibility of add user modal
  const [positions, setPositions] = useState([]); // State for positions data
  const [form] = Form.useForm(); // Form instance for user input form

  // Function to fetch users data based on search term
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${api_url}/manageUsers/getData`, {
        params: { search: searchTerm }, // Passing search term as query parameter
        birthday: dayjs(users.birthday).format(dateFormat) // Formatting birthday date
      });
      setUsers(response.data); // Updating users state with fetched data
      setUserCount(response.data.length); // Setting total user count
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Error fetching users!'); // Showing error message
    }
  };

  // Function to fetch positions data
  const fetchPositions = async () => {
    try {
      const response = await axios.get(`${api_url}/manageUsers/positionData`); // Fetching positions data
      setPositions(response.data); // Updating positions state with fetched data
    } catch (error) {
      console.error('Error fetching positions:', error);
      message.error('Error fetching positions!'); // Showing error message
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users data on component mount and when search term changes
    fetchPositions(); // Fetch positions data on component mount
  }, [searchTerm]);

  // Function to handle search based on search term
  const handleSearch = () => {
    fetchUsers(); // Fetch users data on search button click
  };

  // Function to check if username is available
  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.get(`${api_url}/manageUsers/checkUsername`, {
        params: { username }, // Passing username as query parameter
      });
      return response.data.available; // Returning availability status
    } catch (error) {
      console.error('Error checking username availability:', error);
      message.error('Error checking username availability!'); // Showing error message
      return false;
    }
  };

  // Function to remove user
  const removeUser = async (username) => {
    try {
      const response = await axios.delete(`${api_url}/manageUsers/remove/${username}`); // Deleting user by username
      if (response.status === 200) {
        fetchUsers(); // Refreshing users data after deletion
        message.success('User removed successfully'); // Showing success message
      } else {
        message.error('Error removing user'); // Showing error message
      }
    } catch (error) {
      console.error('Error removing user:', error);
      message.error('Error removing user!'); // Showing error message
    }
  };

  // Function to handle adding new user
  const handleAddUser = async (values) => {
    const isUsernameAvailable = await checkUsernameAvailability(values.username); // Checking username availability
    if (!isUsernameAvailable) {
      message.error('Username is already taken!'); // Showing error message if username is not available
      return;
    }

    // Encrypting sensitive data before sending
    const encryptedPassword = encrypt(values.password);
    const encryptedEmail = encrypt(values.email);
    const encryptedPhoneNo = encrypt(values.phoneNo);

    const encryptedData = {
      ...values,
      password: encryptedPassword.value,
      email: encryptedEmail.value,
      phoneNo: encryptedPhoneNo.value,
      passIv: encryptedPassword.iv,
      emailIv: encryptedEmail.iv,
      phoneNoIv: encryptedPhoneNo.iv
    };

    try {
      const response = await axios.post(`${api_url}/manageUsers/add`, {
        ...encryptedData,
        pId: positions.find((pos) => pos.positionName === values.positionName).pId, // Finding position ID based on position name
        birthday: values.birthday.format(dateFormat), // Formatting birthday date
      });
      if (response.status === 201) {
        fetchUsers(); // Refreshing users data after addition
        setShowAddUserModal(false); // Closing add user modal
        message.success('User added successfully'); // Showing success message
      } else {
        message.error('Error adding user!'); // Showing error message
      }
    } catch (error) {
      console.error('Error adding user:', error);
      message.error('Error adding user!'); // Showing error message
    }
  };

  // Function to open add user modal
  const openAddUserModal = () => {
    form.resetFields(); // Resetting form fields
    setShowAddUserModal(true); // Setting state to show add user modal
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
      render: (text) => dayjs(text).format(dateFormat) // Formatting birthday date
    },
    {
      title: 'Phone No.',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
    },
    {
      title: 'Position',
      dataIndex: 'positionName',
      key: 'positionName',
    },
    {
      title: 'Role',
      dataIndex: 'positionName',
      key: 'role',
      render: (text) => (text === 'Admin' ? 'Admin' : 'Hospital Staff'), // Displaying user role based on admin user ID
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={() => removeUser(record.username)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} className='remove-button' danger>Remove</Button>
        </Popconfirm>
      ),
    },
  ];

  // Handler for refreshing the page
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="manage-users-container">
      <h1>Manage Users</h1>
      <div className="manage-users-header">
        <div className="search-container">
          <h3>Users: {userCount}</h3> {/* Displaying total user count */}
          <Input
            type="text"
            className="search-input"
            placeholder="Search..." // Placeholder text for search input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Handling search term change
          />
          <Button type="primary" onClick={handleSearch}>
            Search {/* Search button */}
          </Button>
          <Button id='add-user' type="primary" onClick={openAddUserModal}>
            Add New User {/* Button to add new user */}
          </Button>
          {/* Button to refresh the page */}
          <Tooltip title="Refresh">
            <Button 
                type="primary" 
                className='refresh-button' 
                onClick={handleRefresh} 
                icon={<ReloadOutlined />}
                style={{ width: '40px', padding:'10px' }}
            />
          </Tooltip>
        </div>
      </div>

      <div className="users-table-container">
        <Table dataSource={users} columns={columns} rowKey="username" /> {/* Rendering users table */}
      </div>

      {/* Modal for adding new user */}
      <Modal
        title="Add New User"
        visible={showAddUserModal}
        onCancel={() => setShowAddUserModal(false)}
        footer={null}
        className='add-user-modal'
      >
        {/* User input form */}
        <Form layout="vertical" onFinish={handleAddUser} form={form}>
          <Form.Item
            label="Username"
            name="username"
            rules={[...usernameRules]} // Validation rules for username input
          >
            <Input placeholder="Enter Username" />
          </Form.Item>

          <Form.Item 
            label="Full Name" 
            name="fullName" 
            rules={[...nameRules]} // Validation rules for full name input
          >
            <Input placeholder="Enter Full Name" />
          </Form.Item>

          <Form.Item 
            label="Email" 
            name="email" 
            rules={[...emailRules]} // Validation rules for email input
          >
            <Input placeholder="Enter email"/>
          </Form.Item>

          <Form.Item label="Birthday" name="birthday" 
            rules={[...birthdayRules]} // Validation rules for birthday input
          >
            <DatePicker 
              format={dateFormat} 
              disabledDate={disableFutureDates} // Disabling future dates in date picker
            />
          </Form.Item>

          <Form.Item label="Phone Number" name="phoneNo" 
            rules={[...phoneNoRules]} // Validation rules for phone number input
          >
            <Input placeholder="Enter Phone Number"/>
          </Form.Item>

          <Form.Item label="Position" name="positionName" rules={[...positionRules]}>
            <Select placeholder="Select position">
              {positions.map((position) => (
                <Select.Option key={position.pId} value={position.positionName}>
                  {position.positionName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Password" name="password" 
            rules={[...passwordRules]} // Validation rules for password input
          >
            <Input.Password placeholder="Enter Password"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit {/* Submit button */}
            </Button>
            <Button onClick={() => setShowAddUserModal(false)} style={{ marginLeft: 8 }}>
              Close {/* Close button */}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
