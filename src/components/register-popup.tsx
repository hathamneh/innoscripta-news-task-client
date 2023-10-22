import { AuthErrors, useAuth } from '@/hooks/auth';
import Label from '@/ui/Label';
import Input from '@/ui/Input';
import InputError from '@/ui/InputError';
import { FormEventHandler, useState } from 'react';
import { Button, Modal } from 'antd';

type Props = {
  visible?: boolean;
  onClose?: () => void;
  onGoToLogin?: () => void;
};

export default function RegisterPopup({
  visible,
  onClose,
  onGoToLogin,
}: Props) {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState<AuthErrors>({});

  const submitForm: FormEventHandler = async event => {
    event.preventDefault();

    try {
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        setErrors,
        setStatus: () => {},
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
      title="Register"
      footer={null}>
      <div className="space-y-6 p-6 max-w-md mx-auto">
        <form onSubmit={submitForm}>
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>

            <Input
              id="name"
              type="text"
              value={name}
              className="block mt-1 w-full"
              onChange={event => setName(event.target.value)}
              required
              autoFocus
            />

            <InputError messages={errors.name} className="mt-2" />
          </div>

          {/* Email Address */}
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={event => setEmail(event.target.value)}
              required
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
              autoComplete="new-password"
            />

            <InputError messages={errors.password} className="mt-2" />
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <Label htmlFor="passwordConfirmation">Confirm Password</Label>

            <Input
              id="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              className="block mt-1 w-full"
              onChange={event => setPasswordConfirmation(event.target.value)}
              required
            />

            <InputError
              messages={errors.password_confirmation}
              className="mt-2"
            />
          </div>
          <div className="flex mt-4 justify-between">
            <Button type="link" onClick={onGoToLogin}>
              Already registered?
            </Button>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
