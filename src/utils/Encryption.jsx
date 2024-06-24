import CryptoJS from 'crypto-js';

const secret_key = import.meta.env.VITE_SECRET_KEY;

const encrypt = (text) => {
    const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV
    const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(secret_key), {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });

    return {
        iv: iv.toString(),
        value: encrypted.toString()
    };
};

export default encrypt;
