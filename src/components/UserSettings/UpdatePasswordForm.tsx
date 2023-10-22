import Input from '@/ui/Input';
import { Transition } from '@headlessui/react';

import { useState } from 'react';
import axios, { csrf } from '@/lib/axios';
import { AuthErrors } from '@/hooks/auth';
import { Button, Form } from 'antd';

const UpdatePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [errors, setErrors] = useState<AuthErrors>({});
  const [status, setStatus] = useState<string | null>(null);

  const submitForm = async () => {
    await csrf();

    setErrors({});
    setStatus(null);

    axios
      .put('/api/password', {
        current_password: currentPassword,
        password: password,
        password_confirmation: passwordConfirmation,
      })
      .then(response => setStatus(response.data.status))
      .catch(error => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  return (
    <section>
      <header>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Update Password
        </h2>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </header>

      <Form onFinish={submitForm} className="mt-6" layout="vertical">
        {/* Current password */}
        <Form.Item
          label="Current Password"
          help={errors.current_password}
          validateStatus={errors.current_password ? 'error' : ''}>
          <Input
            type="password"
            className="block mt-1 w-full"
            onChange={event => setCurrentPassword(event.target.value)}
            required
            autoComplete="current_password"
          />
        </Form.Item>

        <Form.Item
          label="New Password"
          help={errors.password}
          validateStatus={errors.password ? 'error' : ''}>
          <Input
            id="password"
            type="password"
            className="block mt-1 w-full"
            onChange={event => setPassword(event.target.value)}
            required
            autoComplete="new_password"
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          help={errors.password_confirmation}
          validateStatus={errors.password_confirmation ? 'error' : ''}>
          <Input
            id="password_confirmation"
            type="password"
            className="block mt-1 w-full"
            onChange={event => setPasswordConfirmation(event.target.value)}
            required
            autoComplete="password_confirmation"
          />
        </Form.Item>

        <div className="flex items-center gap-4">
          <Button type="primary" htmlType="submit">
            Save
          </Button>

          {status === 'password-updated' && (
            <Transition
              show={true}
              enterFrom="opacity-0"
              leaveTo="opacity-0"
              className="transition ease-in-out">
              <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
            </Transition>
          )}
        </div>
      </Form>
    </section>
  );
};

export default UpdatePasswordForm;
