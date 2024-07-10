import React, { useState } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import '../../styles/TitleBar.scss'; 
import ProfileModal from '../EditProfile/EditUserProfile'; 
import ResetPassword from '../ResetPassword/ResetPassword'; 
import useLogout from '../Logout/Logout'; 
import SecureLS from 'secure-ls';

const ls = new SecureLS({ encodingType: 'aes' }); // Initializing SecureLS with AES encoding

const TitleBar = () => {
  const fullName = ls.get('fullName'); // Retrieve the fullName securely
  const avatarUrl = ls.get('avatarUrl'); // Retrieve the avatarUrl securely

  const [menuVisible, setMenuVisible] = useState(false); // State to manage menu visibility
  const [profileModalVisible, setProfileModalVisible] = useState(false); // State to manage profile modal visibility
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false); // State to manage reset password modal visibility

  const logout = useLogout(); // Initialize logout function

  const handleMenuClick = (e) => {
    // Handle menu item click events
    if (e.key === 'profile') {
      setProfileModalVisible(true); // Show the profile modal
      setMenuVisible(false); // Hide the menu
    } else if (e.key === 'reset') {
      setResetPasswordModalVisible(true); // Show the reset password modal
      setMenuVisible(false); // Hide the menu
    } else if (e.key === 'logout') {
      logout(); // Logout
    }
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
        <a href='/Dashboard'><img src='src/assets/logo.png' alt='Logo' /></a> {/* Link to dashboard */}
      </div>
      <div className="avatar_name">
        <div className="name">
          <div className="greeting">Hi,</div>
          <div className="user_name">{fullName || 'User'}</div> {/* Display user's full name */}
        </div>
        <Dropdown
          overlay={menu} // Dropdown menu
          onVisibleChange={(visible) => setMenuVisible(visible)} // Update menu visibility
          visible={menuVisible} // Current menu visibility state
          trigger={['click']} // Trigger dropdown on click
          placement='bottomRight'
        >
          <div className="avatar" onClick={() => setMenuVisible(!menuVisible)}>
            <Avatar size={60} src={avatarUrl || 'src/assets/profile.jpg'} alt='Profile' /> {/* Display avatar */}
          </div>
        </Dropdown>

        {/* Profile Modal */}
        <ProfileModal
          visible={profileModalVisible}
          onClose={() => setProfileModalVisible(false)}
        />

        {/* Reset Password Modal */}
        <ResetPassword
          visible={resetPasswordModalVisible}
          onClose={() => setResetPasswordModalVisible(false)}
        />
      </div>
    </div>
  );
};

export default TitleBar;
