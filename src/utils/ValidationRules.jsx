// Import dayjs library for date manipulation
import dayjs from 'dayjs';

// Validation rules for username input field
export const usernameRules = [
    { required: true, message: 'Please enter the username' },
    { 
        pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,49}$/, 
        message: 'Username must be 6-50 characters long, start with a letter, and can contain only alphanumeric characters and underscores' 
    }
];

// Validation rules for full name input field
export const nameRules = [
    { required: true, message: 'Please enter the full name' },
    { pattern: /^[a-zA-Z\s]*$/, message: 'Name can only include letters and spaces' },
    { max: 250, message: 'Full name cannot exceed 250 characters' }
];

// Validation rules for password input field
export const passwordRules = [
    { required: true, message: 'Please enter your new password' },
    { min: 8, message: 'Password must be at least 8 characters' },
    { max: 60, message: 'Password cannot exceed 60 characters' },
    { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
    { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter' },
    { pattern: /[0-9]/, message: 'Password must contain at least one digit' },
    { pattern: /[!@#$%^&*(),.?":{}|<>]/, message: 'Password must contain at least one special character' }
];

// Validation rules for email input field
export const emailRules = [
    { type: 'email', message: 'Please enter a valid email' },
    { max: 100, message: 'Email cannot exceed 100 characters' }
];

// Validation rules for birthday input field
export const birthdayRules = [
    { required: true, message: 'Please enter the birthday' }
];

// Validation rules for phone number input field
export const phoneNoRules = [
    { required: true, message: 'Please enter the phone number' },
    { pattern: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' }
];

// Validation rules for selecting position
export const positionRules = [
    { required: true, message: 'Please select a position' }
];

// Custom validator to ensure new password is different from current password
export const validateDifferentFromCurrentPassword = ({ getFieldValue }) => ({
    validator(_, value) {
        if (!value || getFieldValue('currentPassword') !== value) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('New password must be different from the current password'));
    }
});

// Function to disable future dates in DatePicker
export const disableFutureDates = (current) => {
    return current && current > dayjs().endOf('day');
};

// Validation rules for selecting location
export const locationRules = [
    { required: true, message: 'Please select location' }
];

// Validation rules for entering IP address
export const ipAddressRules = [
    { required: true, message: 'Please enter IP address' }
];

// Validation rules for entering camera model
export const modelRules = [
    { required: true, message: 'Please enter camera model' }
];

// Validation rules for entering installation date
export const installationDateRules = [
    { required: true, message: 'Please enter installation date' }
];

// Validation rules for entering camera status
export const cameraStatusRules = [
    { required: true, message: 'Please enter camera status' }
];
