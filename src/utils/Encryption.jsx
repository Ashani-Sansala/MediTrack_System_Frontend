import CryptoJS from 'crypto-js'; // Import the CryptoJS library for AES encryption

// Fetch the secret key from environment variables
const secret_key = import.meta.env.VITE_SECRET_KEY;

// Function to encrypt text using AES encryption in CBC mode with PKCS7 padding
const encrypt = (text) => {
    // Generate a random initialization vector (IV)
    const iv = CryptoJS.lib.WordArray.random(16);

    // Encrypt the text using AES with the secret key and generated IV
    const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(secret_key), {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });

    // Return an object containing IV and the encrypted value
    return {
        iv: iv.toString(),    // Convert IV to string for storage or transmission
        value: encrypted.toString()   // Convert encrypted text to string for storage or transmission
    };
};

export default encrypt;
