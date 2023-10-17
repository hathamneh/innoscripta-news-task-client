import React, { useState } from 'react';
import LoginPopup from '@/components/login-popup';
import RegisterPopup from '@/components/register-popup';
import Button from '../Buttons/Button';

export default function TopbarUserLogin() {
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);
  const [registerPopupVisible, setRegisterPopupVisible] = useState(false);

  return (
    <>
      <LoginPopup
        visible={loginPopupVisible}
        onClose={() => setLoginPopupVisible(false)}
        onGoToRegister={() => {
          setLoginPopupVisible(false);
          setRegisterPopupVisible(true);
        }}
      />
      <RegisterPopup
        visible={registerPopupVisible}
        onClose={() => setRegisterPopupVisible(false)}
        onGoToLogin={() => {
          setRegisterPopupVisible(false);
          setLoginPopupVisible(true);
        }}
      />
      <Button onClick={() => setLoginPopupVisible(true)}>Login</Button>
    </>
  );
}
