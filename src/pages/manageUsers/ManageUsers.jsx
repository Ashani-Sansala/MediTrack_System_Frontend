import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Button, Modal, Form, Select, message, Popconfirm } from 'antd';
import { usernameRules, nameRules, emailRules, 
         passwordRules, birthdayRules, phoneNoRules } from '../../utils/ValidationRules';
import encrypt from '../../utils/Encryption'; 
import './ManageUsers.scss'

const api_url = import.meta.env.VITE_API_URL;
const admin_userid = import.meta.env.VITE_ADMIN_USERID;

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [positions, setPositions] = useState([]);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${api_url}/manageUsers/search`, {
        params: { search: searchTerm },
      });
      setUsers(response.data);
      setUserCount(response.data.length);
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Error fetching users!');
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await axios.get(`${api_url}/manageUsers/positions`);
      setPositions(response.data);
    } catch (error) {
      console.error('Error fetching positions:', error);
      message.error('Error fetching positions!');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPositions();
  }, [searchTerm]);

  const handleSearch = () => {
    fetchUsers();
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.get(`${api_url}/manageUsers/checkUsername`, {
        params: { username },
      });
      return response.data.available;
    } catch (error) {
      console.error('Error checking username availability:', error);
      message.error('Error checking username availability!');
      return false;
    }
  };

  const removeUser = async (username) => {
    try {
      const response = await axios.delete(`${api_url}/manageUsers/remove/${username}`);
      if (response.status === 200) {
        fetchUsers();
        message.success('User removed successfully');
      } else {
        message.error('Error removing user');
      }
    } catch (error) {
      console.error('Error removing user:', error);
      message.error('Error removing user!');
    }
  };

  const handleAddUser = async (values) => {
    const isUsernameAvailable = await checkUsernameAvailability(values.username);
    if (!isUsernameAvailable) {
      message.error('Username is already taken!');
      return;
    }

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
        pId: positions.find((pos) => pos.positionName === values.positionName).pId,
      });
      if (response.status === 201) {
        fetchUsers();
        setShowAddUserModal(false);
        message.success('User added successfully');
      } else {
        message.error('Error adding user!');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      message.error('Error adding user!');
    }
  };

  const openAddUserModal = () => {
    form.resetFields();
    setShowAddUserModal(true);
  };

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
      render: (text) => new Date(text).toISOString().split('T')[0],
    },
    {
      title: 'Phone Number',
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
      dataIndex: 'pId',
      key: 'role',
      render: (text) => (text === admin_userid ? 'Admin' : 'Hospital Staff'),
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
          <Button danger>Remove</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="manage-users-container">
      <h1>Manage Users</h1>
      <div className="manage-users-header">
        <div className="search-container">
          <h3>Users: {userCount}</h3>
          <Input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            
          />
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button id='add-user' type="primary" onClick={openAddUserModal}>
            Add New User
          </Button>
          
        </div>
      </div>
      <div className="users-table-container">
        <Table dataSource={users} columns={columns} rowKey="username" />
      </div>
      

      <Modal
        title="Add New User"
        visible={showAddUserModal}
        onCancel={() => setShowAddUserModal(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddUser} form={form}>
          <Form.Item
            label="Username"
            name="username"
            rules={[...usernameRules]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            label="Full Name" 
            name="fullName" 
            rules={[...nameRules]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            label="Email" 
            name="email" 
            rules={[...emailRules]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Birthday" name="birthday" 
            rules={[...birthdayRules]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Phone Number" name="phoneNo" 
            rules={[...phoneNoRules]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Position" name="positionName" rules={[]}>
            <Select>
              {positions.map((position) => (
                <Select.Option key={position.pId} value={position.positionName}>
                  {position.positionName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Password" name="password" 
            rules={[...passwordRules,]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={() => setShowAddUserModal(false)} style={{ marginLeft: 8 }}>
              Close
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
