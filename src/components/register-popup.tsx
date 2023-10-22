import { AuthErrors, useAuth } from '@/hooks/auth';
import Input from '@/ui/Input';
import { useState } from 'react';
import { Button, Form, Modal } from 'antd';

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

  const submitForm = async () => {
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
        <Form onFinish={submitForm} layout="vertical">
          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            help={errors.name}
            validateStatus={errors.name ? 'error' : ''}>
            <Input
              type="text"
              value={name}
              className="block mt-1 w-full"
              onChange={event => setName(event.target.value)}
              required
              autoFocus
            />
          </Form.Item>

          {/* Email Address */}
          <Form.Item
            label="Email"
            name="email"
            help={errors.email}
            validateStatus={errors.email ? 'error' : ''}>
            <Input
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={event => setEmail(event.target.value)}
              required
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            help={errors.password}
            validateStatus={errors.password ? 'error' : ''}>
            <Input
              type="password"
              value={password}
              className="block mt-1 w-full"
              onChange={event => setPassword(event.target.value)}
              required
              autoComplete="new-password"
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label="Confirm Password"
            name="password_confirmation"
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

          <div className="flex mt-4 justify-between">
            <Button type="link" onClick={onGoToLogin}>
              Already registered?
            </Button>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
