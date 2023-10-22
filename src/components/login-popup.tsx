import { AuthErrors, useAuth } from '@/hooks/auth';
import Label from '@/ui/Label';
import Input from '@/ui/Input';
import AuthSessionStatus from '@/components/AuthSessionStatus';
import InputError from '@/ui/InputError';
import Checkbox from '@/ui/Checkbox';
import { useRouter } from 'next/router';
import { FormEventHandler, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

type Props = {
  visible?: boolean;
  onClose?: () => void;
  onGoToRegister?: () => void;
};

export default function LoginPopup({
  visible,
  onClose,
  onGoToRegister,
}: Props) {
  const { query } = useRouter();

  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState<AuthErrors>({});
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const reset = query && query.reset ? (query.reset as string) : '';
    if (
      reset.length > 0 &&
      errors.email?.length === 0 &&
      errors.password?.length === 0
    ) {
      setStatus(atob(reset));
    } else {
      setStatus(null);
    }
  });

  const submitForm: FormEventHandler = async event => {
    event.preventDefault();

    try {
      await login({
        email,
        password,
        remember: shouldRemember,
        setErrors,
        setStatus,
      });
      onClose?.();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      width="600px"
      title="Login"
      footer={null}>
      <div className="space-y-6 p-6 pt-12 max-w-md mx-auto">
        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status} />

        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={event => setEmail(event.target.value)}
              required
              isFocused={true}
            />

            <InputError messages={errors.email} className="mt-2" />
          </div>

          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full"
              onChange={event => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />

            <InputError messages={errors.password} className="mt-2" />
          </div>

          {/* Remember Me */}
          <div className="block mt-4">
            <label htmlFor="remember_me" className="inline-flex items-center">
              <Checkbox
                id="remember_me"
                name="remember"
                checked={shouldRemember}
                onChange={event => setShouldRemember(event.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            </label>
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button type="link" href="/forgot-password">
              Forgot your password?
            </Button>

            <Button type="primary" className="ml-4" htmlType="submit">
              Login
            </Button>
          </div>
          <hr className="my-6 border-gray-300 dark:border-gray-700 w-full" />
          <div className="flex items-center justify-center mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?
            </span>

            <Button type="link" onClick={onGoToRegister} className="ml-4">
              Create an account
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
