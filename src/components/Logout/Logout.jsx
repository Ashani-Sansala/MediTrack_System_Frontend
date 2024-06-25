import SecureLS from 'secure-ls';
import { useNavigate } from 'react-router-dom';

const ls = new SecureLS({ encodingType: 'aes' });

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    ls.remove('userName');
    ls.remove('userID'); 
    ls.remove('pID');
    navigate('/'); // Redirect to the login page
  };

  return logout;
};

export default useLogout;
