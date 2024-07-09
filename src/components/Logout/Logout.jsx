import SecureLS from 'secure-ls';
import { useNavigate } from 'react-router-dom';

// Initializing SecureLS with AES encryption
const ls = new SecureLS({ encodingType: 'aes' });

// Custom hook to handle user logout
const useLogout = () => {
  const navigate = useNavigate(); // Initialize the navigate function to handle navigation

  const logout = () => {
    // Remove user-related data from local storage
    ls.remove('fullName');
    ls.remove('username'); 
    ls.remove('category');
    ls.remove('avatarUrl');
    navigate('/'); // Redirect to the login page
  };

  return logout; // Return the logout function so it can be used in components
};

export default useLogout;
