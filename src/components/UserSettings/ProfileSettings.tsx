import React from 'react';
import { Card } from 'antd';
import UpdateProfileInformationForm from '@/components/UserSettings/UpdateProfileInformationForm';
import UpdatePasswordForm from '@/components/UserSettings/UpdatePasswordForm';
import DeleteUserForm from '@/components/UserSettings/DeleteUserForm';

export const ProfileSettings = () => {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="max-w-xl">
          <UpdateProfileInformationForm />
        </div>
      </Card>

      <Card>
        <div className="max-w-xl">
          <UpdatePasswordForm />
        </div>
      </Card>

      <Card>
        <div className="max-w-xl">
          <DeleteUserForm />
        </div>
      </Card>
    </div>
  );
};
