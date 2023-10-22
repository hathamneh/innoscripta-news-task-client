import AuthCard from '@/components/AuthCard';
import AuthSessionStatus from '@/components/AuthSessionStatus';
import GuestLayout from '@/components/Layouts/GuestLayout';
import Input from '@/ui/Input';
import { AuthErrors, useAuth } from '@/hooks/auth';
import { useState } from 'react';
import Head from 'next/head';
import { Button, Form } from 'antd';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  });

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<AuthErrors>({});
  const [status, setStatus] = useState(null);

  const submitForm = () => {
    forgotPassword({ email, setErrors, setStatus });
  };

  return (
    <GuestLayout>
      <Head>
        <title>Laravel - Forgot your password</title>
      </Head>
      <AuthCard>
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </div>

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
              name="email"
              value={email}
              className="block mt-1 w-full"
              onChange={event => setEmail(event.target.value)}
              required
              autoFocus
            />
          </Form.Item>

          <div className="flex items-center justify-end mt-4">
            <Button type="primary" htmlType="submit">
              Email Password Reset Link
            </Button>
          </div>
        </Form>
      </AuthCard>
    </GuestLayout>
  );
};

export default ForgotPassword;
