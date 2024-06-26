import React, { useState, useRef } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import SecureLS from 'secure-ls';
import encrypt from "../../utils/Encryption";

const api_url = import.meta.env.VITE_API_URL;

const ResetPassword = ({ visible, onClose }) => {

    const [loading, setLoading] = useState(false);
    const ls = new SecureLS({ encodingType: 'aes' });
    const [form] = Form.useForm();  

    const handleFinish = async (values) => {
        setLoading(true);
        const userID = ls.get('userID');

        const encryptedOldPassword = encrypt(values.oldPassword); 
        const encryptedNewPassword = encrypt(values.newPassword);

        try {
            const response = await axios.post(`${api_url}/userProfile/resetPassword`, {
                userID,
                oldPassword: encryptedOldPassword.value,
                newPassword: encryptedNewPassword.value,
                oldPasswordIv: encryptedOldPassword.iv,
                newPasswordIv: encryptedNewPassword.iv
            });

            if (response.data.success) {
                message.success('Password reset successfully');
                form.resetFields(); 
                onClose();
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    message.error('Invalid request or missing fields.');
                } else if (error.response.status === 401) {
                    message.error('Old password is incorrect!');
                } else {
                    message.error('Something went wrong. Please try to reset your password again!');
                }
            } else {
                message.error('Something went wrong. Please try to reset your password again!');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields(); 
        onClose();
    };

    return (
        <Modal
            title="Reset Password"
            visible={visible}
            onCancel={handleCancel}  
            footer={null}
        >
            <Form
                form={form}  
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item
                    name="oldPassword"
                    label="Old Password"
                    rules={[{ required: true, message: 'Please enter your old password' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[{ required: true, message: 'Please enter your new password' }]}
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
