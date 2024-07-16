import React, { useEffect, useState } from 'react';
import { Modal, Avatar, Form, Input, DatePicker, Button, message, Upload } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import SecureLS from 'secure-ls';
import Resizer from 'react-image-file-resizer';
import encrypt from '../../utils/Encryption'; 
import { nameRules, emailRules, birthdayRules, phoneNoRules, disableFutureDates } from '../../utils/ValidationRules';
import './EditUserProfile.scss';

// API URL from environment variables
const api_url = import.meta.env.VITE_API_URL;
// Date format for the date picker
const dateFormat = 'YYYY-MM-DD';
// Secure local storage instance
const ls = new SecureLS({ encodingType: 'aes' });

const UserProfile = ({ visible, onClose }) => {
  // Ant Design Form instance
  const [form] = Form.useForm();
  // State variables
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // Get the username from secure local storage
  const username = ls.get('username');

  // Fetch user details when the modal is visible
  useEffect(() => {
    if (visible) {
      fetchUserDetails();
    } else {
      form.resetFields();
      setIsFormTouched(false);
      setAvatarFile(null);
      setAvatarUrl(null);
    }
  }, [visible]);

  // Function to fetch user details from the server
  const fetchUserDetails = async () => {
    try {
      const response = await axios.post(`${api_url}/userProfile/getUserProfile`, { username });
      if (response.data.success) {
        setUserDetails(response.data.userDetails);
        form.setFieldsValue({
          fullName: response.data.userDetails.fullName,
          positionName: response.data.userDetails.positionName,
          email: response.data.userDetails.email,
          birthday: dayjs(response.data.userDetails.birthday, dateFormat),
          phoneNo: response.data.userDetails.phoneNo,
        });
        setAvatarUrl(response.data.userDetails.avatarUrl || 'src/assets/profile.jpg');
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

  // Function to handle form submission
  const onFinish = async (values) => {
    try {
      // Encrypt sensitive data
      const encryptedUsername = encrypt(username);
      const encryptedEmail = encrypt(values.email);
      const encryptedPhoneNo = encrypt(values.phoneNo);

      // Prepare form data for submission
      const formData = new FormData();
      formData.append('username', encryptedUsername.value);
      formData.append('fullName', values.fullName);
      formData.append('birthday', values.birthday.format('YYYY-MM-DD'));
      formData.append('email', encryptedEmail.value);
      formData.append('phoneNo', encryptedPhoneNo.value);
      formData.append('positionName', userDetails.positionName);
      formData.append('usernameIv', encryptedUsername.iv);
      formData.append('emailIv', encryptedEmail.iv);
      formData.append('phoneNoIv', encryptedPhoneNo.iv);

      // Append avatar file if available
      if (avatarFile) {
        formData.append('avatar', avatarFile, avatarFile.name);
        console.log('Avatar file appended:', avatarFile.name);
      } else {
        console.log('No avatar file to append');
      }

      // Log form data contents for debugging
      console.log('FormData contents:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      // Submit form data to the server
      const response = await axios.post(`${api_url}/userProfile/updateUserProfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        message.success('Profile updated successfully');
        ls.set('fullName', values.fullName);
        ls.set('avatarUrl', response.data.avatarUrl);
        onClose();
        fetchUserDetails();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      const status = error.response?.status;
      let errorMessage = 'Something went wrong. Please try updating your profile again!';
      if (status === 400) {
        errorMessage = 'Invalid positionName!';
      } else if (status === 401) {
        errorMessage = 'You are not logged in!';
      }
      message.error(errorMessage);
    }
  };

  // Handle form field changes to track if the form is touched
  const handleFieldsChange = () => {
    setIsFormTouched(form.isFieldsTouched());
  };

  // Handle avatar file upload and resize
  const beforeUpload = (file) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(file.type)) {
      message.error('Invalid file type. Please select an image file.');
      return Upload.LIST_IGNORE; // Ignore this file and do not upload
    }
    Resizer.imageFileResizer(
      file,
      200,
      200,
      'JPEG',
      100,
      0,
      (uri) => {
        const resizedFile = new File([uri], file.name, { type: 'image/jpeg' });
        setAvatarFile(resizedFile);
        setAvatarUrl(URL.createObjectURL(resizedFile));
        setIsFormTouched(true);
        console.log('Avatar file selected:', file.name);
      },
      'blob'
    );
    return false; // Prevent the upload process
  };

  if (loading) {
    return null;
  }

  // Determine user role
  const role = userDetails?.positionName === 'Admin' ? 'Admin' : 'Hospital Staff';

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
        <Upload
          accept="image/*"
          beforeUpload={beforeUpload}
          showUploadList={false}
        >
          <Avatar
            size="large"
            src={avatarUrl}
            alt={userDetails?.fullName}
            style={{ cursor: 'pointer' }}
          />
        </Upload>
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
          positionName: userDetails?.positionName,
          email: userDetails?.email,
          birthday: dayjs(userDetails?.birthday, dateFormat),
          phoneNo: userDetails?.phoneNo,
        }}
        onFieldsChange={handleFieldsChange}
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
          <Input value={userDetails?.positionName} disabled />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[...emailRules]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="birthday"
          label="Birthdate"
          rules={[...birthdayRules]}
        >
          <DatePicker 
            format={dateFormat} 
            disabledDate={disableFutureDates}
          />
        </Form.Item>

        <Form.Item
          name="phoneNo"
          label="Phone Number"
          rules={[...phoneNoRules]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!isFormTouched}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserProfile;
