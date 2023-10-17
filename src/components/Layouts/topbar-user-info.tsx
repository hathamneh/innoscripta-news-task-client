import React from 'react';
import { useAuth } from '@/hooks/auth';
import Dropdown from '@/components/Dropdown';
import { DropdownButton } from '@/components/DropdownLink';
import { Button } from '@/components/Buttons';
import { IconUserCircle } from '@tabler/icons-react';

export default function TopbarUserInfo() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const dropdownTrigger = (
    <Button className="capitalize text-slate-600 dark:text-slate-300 gap-2 !py-1 !px-2">
      <IconUserCircle className="w-5" />
      {user.name}
    </Button>
  );

  return (
    <Dropdown trigger={dropdownTrigger}>
      <DropdownButton onClick={logout}>Logout</DropdownButton>
    </Dropdown>
  );
}
