import React from 'react';
import { useAuth } from '@/hooks/auth';
import { IconUserCircle } from '@tabler/icons-react';
import { Button, Dropdown } from 'antd';
import { useRouter } from 'next/router';

export default function TopbarUserInfo() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const items = [
    {
      key: 'settings',
      label: 'Settings',
      onClick: () => router.push('/profile'),
    },
    { key: 'logout', label: 'Logout', onClick: logout },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button icon={<IconUserCircle className="w-5" />}>{user.name}</Button>
    </Dropdown>
  );
}
