import React, { useState } from 'react';
import LoginPopup from '@/components/login-popup';
import RegisterPopup from '@/components/register-popup';
import { Button } from 'antd';

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
      <Button
        type="link"
        onClick={() => setRegisterPopupVisible(true)}
        className="!hidden lg:!inline-flex">
        Register
      </Button>
      <Button onClick={() => setLoginPopupVisible(true)}>Login</Button>
    </>
  );
}
