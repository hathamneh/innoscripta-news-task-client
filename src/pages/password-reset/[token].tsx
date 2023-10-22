import AuthCard from '@/components/AuthCard';
import AuthSessionStatus from '@/components/AuthSessionStatus';
import GuestLayout from '@/components/Layouts/GuestLayout';
import Input from '@/ui/Input';
import { AuthErrors, useAuth } from '@/hooks/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'antd';

const PasswordReset = () => {
  const { query } = useRouter();

  const { resetPassword } = useAuth({ middleware: 'guest' });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState<AuthErrors>({});
  const [status, setStatus] = useState(null);

  const submitForm = () => {
    resetPassword({
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setStatus,
    });
  };

  useEffect(() => {
    const email = query && query.email ? (query.email as string) : '';

    setEmail(email);
  }, [query.email]);

  return (
    <GuestLayout>
      <AuthCard>
        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status} />

        <Form onFinish={submitForm} layout="vertical">
          {/* Email Address */}
          <Form.Item
            label="Email"
            help={errors.email}
            validateStatus={errors.email ? 'error' : ''}>
            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={event => setEmail(event.target.value)}
              required
              autoFocus
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            help={errors.password}
            validateStatus={errors.password ? 'error' : ''}>
            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full"
              onChange={event => setPassword(event.target.value)}
              required
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label="Confirm Password"
            help={errors.password_confirmation}
            validateStatus={errors.password_confirmation ? 'error' : ''}>
            <Input
              id="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              className="block mt-1 w-full"
              onChange={event => setPasswordConfirmation(event.target.value)}
              required
            />
          </Form.Item>

          <div className="flex items-center justify-end mt-4">
            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
          </div>
        </Form>
      </AuthCard>
    </GuestLayout>
  );
};

export default PasswordReset;
