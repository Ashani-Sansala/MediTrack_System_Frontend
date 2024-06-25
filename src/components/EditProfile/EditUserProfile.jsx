import React, { useEffect, useState } from 'react';
import { Modal, Avatar, Form, Input, DatePicker, Button, message, Space } from 'antd';
import moment from 'moment';
import axios from 'axios';
import SecureLS from 'secure-ls';
import './EditUserProfile.scss';

const api_url = import.meta.env.VITE_API_URL;

const dateFormat = 'YYYY-MM-DD';

const ls = new SecureLS({ encodingType: 'aes' });

const UserProfile = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const userID = ls.get('userID'); 

  useEffect(() => {
    if (visible) {
      fetchUserDetails();
    }
  }, [visible]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.post(`${api_url}/userProfile/getUserProfile`, {
        userID
      });
      if (response.data.success) {
        setUserDetails(response.data.userDetails);
        form.setFieldsValue({
          name: response.data.userDetails.name,
          position: response.data.userDetails.position,
          email: response.data.userDetails.email,
          birthdate: moment(response.data.userDetails.birthday, dateFormat),
          phone: response.data.userDetails.phone,
        });
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
          if (error.response.status === 404) {
              message.error('User not found!');
          } else {
              message.error('Unable to retrieve your profile details. Please try again!');
          }
      } else {
          message.error('We encountered an issue loading your profile. Please refresh the page!');
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${api_url}/userProfile/updateUserProfile`, {
        ...values,
        birthdate: values.birthdate.format('YYYY-MM-DD'),
        position: userDetails.position, 
        userID
      });
      if (response.data.success) {
        message.success('Profile updated successfully');
        ls.set('userName', values.name);
        onClose();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
          if (error.response.status === 400) {
              message.error('Invalid position!');
          } else if (error.response.status === 401) {
              message.error('You are not logged in!');
          } else {
              message.error('Something went wrong. Please try updating your profile again!');
          }
      } else {
          message.error('Something went wrong. Please try updating your profile again!');
      }
    }
  };

  if (loading) {
    return null; 
  }

  const role = userDetails?.position === 'Admin' ? 'Admin' : 'Hospital Staff';

  return (
    <Modal
      title="Edit Profile Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={500}
      className='modal-content' 
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Avatar size="large" src={userDetails?.avatar || '/profile.jpg'} alt={userDetails?.name} />
        <div style={{ marginLeft: '10px' }}>
          <div>Hi,</div>
          <div><strong>{userDetails?.name}</strong></div>
        </div>
      </div>

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          name: userDetails?.name,
          position: userDetails?.position,
          email: userDetails?.email,
          birthdate: moment(userDetails?.birthdate, dateFormat),
          phone: userDetails?.phone,
        }}
      >
        <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
          Role: {role}
        </div>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Position"
        >
          <Input value={userDetails?.position} disabled />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="birthdate"
          label="Birthdate"
          rules={[{ required: true, message: 'Please enter your birthdate' }]}
        >
          
        <DatePicker defaultValue={userDetails.birthdate} format={dateFormat} />
          
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserProfile;
