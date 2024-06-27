import React, { useEffect, useState } from 'react';
import { Modal, Avatar, Form, Input, DatePicker, Button, message } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import SecureLS from 'secure-ls';
import { nameRules, emailRules, birthdayRules, phoneNoRules } from '../../utils/ValidationRules';
import './EditUserProfile.scss';

const api_url = import.meta.env.VITE_API_URL;

const dateFormat = 'YYYY-MM-DD';

const ls = new SecureLS({ encodingType: 'aes' });

const UserProfile = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const username = ls.get('username'); 

  useEffect(() => {
    if (visible) {
      fetchUserDetails();
    }
  }, [visible]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.post(`${api_url}/userProfile/getUserProfile`, {
        username
      });
      if (response.data.success) {
        setUserDetails(response.data.userDetails);
        form.setFieldsValue({
          fullName: response.data.userDetails.fullName,
          position: response.data.userDetails.position,
          email: response.data.userDetails.email,
          birthdate: dayjs(response.data.userDetails.birthday, dateFormat),
          phone: response.data.userDetails.phone,
        });
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      const status = error.response?.status;
      let errorMessage = 'Unable to retrieve your profile details. Please try again!';
      if (status === 404) {
          errorMessage = 'User not found!';
      } 
      message.error(errorMessage);
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
        username
      });
      if (response.data.success) {
        message.success('Profile updated successfully');
        ls.set('fullName', values.fullName);
        onClose();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      const status = error.response?.status;
      let errorMessage = 'Something went wrong. Please try updating your profile again!';
  
      if (status === 400) {
          errorMessage = 'Invalid position!';
      } else if (status === 401) {
          errorMessage = 'You are not logged in!';
      } 
      message.error(errorMessage);
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
        <Avatar size="large" src={userDetails?.avatar || '/profile.jpg'} alt={userDetails?.fullName} />
        <div style={{ marginLeft: '10px' }}>
          <div>Hi,</div>
          <div><strong>{userDetails?.fullName}</strong></div>
        </div>
      </div>

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          fullName: userDetails?.fullName,
          position: userDetails?.position,
          email: userDetails?.email,
          birthdate: dayjs(userDetails?.birthdate, dateFormat),
          phone: userDetails?.phone,
        }}
      >
        <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
          Role: {role}
        </div>

        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[...nameRules]}
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
          rules={[...emailRules]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="birthdate"
          label="Birthdate"
          rules={[...birthdayRules]}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[...phoneNoRules]}
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
