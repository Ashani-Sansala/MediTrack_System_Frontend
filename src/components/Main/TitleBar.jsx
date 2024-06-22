import React, { useState } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { useNavigate  } from 'react-router-dom';
import '../../styles/TitleBar.scss';
import SecureLS from 'secure-ls';
import ProfileModal from '../../pages/editUserProfile/EditUserProfile';

const ls = new SecureLS({ encodingType: 'aes' });

const TitleBar = () => {
  const userName = ls.get('userName'); // Retrieve the userName securely
  const navigate = useNavigate(); // Use useNavigate hook for navigation


  const [menuVisible, setMenuVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === 'profile') {
      // Show the profile modal
      setProfileModalVisible(true);
      setMenuVisible(false);
    } 
    else if (e.key === 'logout') {
      // Handle logout
      ls.remove('userName');
      ls.remove('userID'); // Assuming you have stored userID as well
      navigate('/'); // Redirect to the login page
    }
    // Handle other menu options if needed
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">Edit Profile</Menu.Item>
      <Menu.Item key="reset">Reset Password</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className="title_bar">
      <div className="logo_container">
        <a href='/Dashboard'><img src='/meditracker.png' alt='Logo'/></a>
      </div>
      <div className="avatar_name">
        <div className="name">
          <div className="greeting">Hi,</div>
          <div className="user_name">{userName || 'User'}</div>
        </div>
        <Dropdown
          overlay={menu}
          onVisibleChange={(visible) => setMenuVisible(visible)}
          visible={menuVisible}
          trigger={['click']}
          placement='bottomRight'
        >
          <div className="avatar" onClick={() => setMenuVisible(!menuVisible)}>
            <Avatar size={60} src='/profile.jpg' alt='Profile' />
          </div>
        </Dropdown>

        {/* Profile Modal */}
        <ProfileModal
          visible={profileModalVisible}
          onClose={() => setProfileModalVisible(false)}
        />
      </div>
    </div>
  );
};

export default TitleBar;
