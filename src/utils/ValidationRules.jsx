export const usernameRules = [
    { required: true, message: 'Please enter the username' },
    { 
        pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,29}$/, 
        message: 'Username must be 6-30 characters long, start with a letter, and can contain only alphanumeric characters and underscores' 
    }
];

export const nameRules = [
    { required: true, message: 'Please enter the full name' },
    { pattern: /^[a-zA-Z\s]*$/, message: 'Name can only include letters and spaces' },
    { max: 250, message: 'Full name cannot exceed 250 characters' }
];

export const passwordRules = [
    { required: true, message: 'Please enter your new password' },
    { min: 8, message: 'Password must be at least 8 characters' },
    { max: 60, message: 'Password cannot exceed 60 characters' },
    { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
    { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter' },
    { pattern: /[0-9]/, message: 'Password must contain at least one digit' },
    { pattern: /[!@#$%^&*(),.?":{}|<>]/, message: 'Password must contain at least one special character' }
];

export const emailRules = [
    { required: true, message: 'Please enter the email' },
    { type: 'email', message: 'Please enter a valid email' },
    { max: 50, message: 'Email cannot exceed 50 characters' }
];

export const birthdayRules = [
    { required: true, message: 'Please enter the birthday' }
];

export const phoneNoRules = [
    { required: true, message: 'Please enter the phone number' },
    { pattern: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' }
];

export const positionRules = [
    { required: true, message: 'Please select a position' }
];

export const validateDifferentFromCurrentPassword = ({ getFieldValue }) => ({
    validator(_, value) {
        if (!value || getFieldValue('currentPassword') !== value) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('New password must be different from the current password'));
    }
});


