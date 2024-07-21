import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import SecureLS from 'secure-ls';
import encrypt from "../../utils/Encryption"; 
import './ResetPassword.scss';
import { passwordRules, validateDifferentFromCurrentPassword } from '../../utils/ValidationRules'; 

const api_url = import.meta.env.VITE_API_URL; // Base API URL from environment variables

const ResetPassword = ({ visible, onClose }) => {
    const [loading, setLoading] = useState(false); // State to manage loading state
    const ls = new SecureLS({ encodingType: 'aes' }); // Initialize SecureLS with AES encoding
    const [form] = Form.useForm(); // Initialize the form

    const handleFinish = async (values) => {
        setLoading(true);
        const username = ls.get('username'); // Retrieve username from secure local storage

        // Encrypt current and new passwords
        const encryptedCurrentPassword = encrypt(values.currentPassword);
        const encryptedNewPassword = encrypt(values.newPassword);

        try {
            const response = await axios.post(`${api_url}/userProfile/resetPassword`, {
                username,
                currentPassword: encryptedCurrentPassword.value,
                newPassword: encryptedNewPassword.value,
                currentPasswordIv: encryptedCurrentPassword.iv,
                newPasswordIv: encryptedNewPassword.iv
            });

            if (response.data.success) {
                message.success('Password reset successfully');
                form.resetFields(); // Reset form fields
                onClose(); // Close the modal
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            const status = error.response?.status;
            let errorMessage = 'Something went wrong. Please try to reset your password again!';

            if (status === 400) {
                errorMessage = 'Invalid request or missing fields!';
            } else if (status === 401) {
                errorMessage = 'Current password is incorrect!';
            }

            message.error(errorMessage);
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    const handleCancel = () => {
        form.resetFields(); // Reset form fields
        onClose(); // Close the modal
    };

    return (
        <Modal
            title="Reset Password"
            visible={visible}
            onCancel={handleCancel}
            footer={null} // No footer buttons
            className='reset-password-modal'
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish} // Handle form submission
            >
                <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[{ required: true, message: 'Please enter your current password' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                        ...passwordRules, 
                        validateDifferentFromCurrentPassword // Validate new password is different from current password
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label="Confirm New Password"
                    dependencies={['newPassword']}
                    rules={[
                        { required: true, message: 'Please confirm your new password' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ResetPassword;
