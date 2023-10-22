import { useRef, useState } from 'react';
import axios, { csrf } from '@/lib/axios';
import Input from '@/ui/Input';
import { AuthErrors, useAuth } from '@/hooks/auth';
import { Button, Form, Modal } from 'antd';

const DeleteUserForm = () => {
  const { logout } = useAuth({ middleware: 'auth' });
  const [form] = Form.useForm();

  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef<HTMLInputElement>();
  const [errors, setErrors] = useState<AuthErrors>({});
  const [status, setStatus] = useState<string | null>(null);

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
  };

  const submitForm = async ({ password }: any) => {
    await csrf();

    setErrors({});
    setStatus(null);

    axios
      .delete('/api/profile', { data: { password: password } })
      .then(response => {
        setStatus(response.data.status);

        closeModal();
        logout();
      })
      .catch(error => {
        if (error.response.status !== 422) throw error;

        passwordInput.current?.focus();

        setErrors(error.response.data.errors);
      });
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Delete Account
        </h2>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Before deleting your account, please download any
          data or information that you wish to retain.
        </p>
      </header>

      <Button type="primary" danger onClick={confirmUserDeletion}>
        Delete Account
      </Button>

      <Modal
        open={confirmingUserDeletion}
        onCancel={closeModal}
        okButtonProps={{ danger: true }}
        okText="Delete Account"
        onOk={() => form.submit()}>
        <Form form={form} onFinish={submitForm} className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Are you sure you want to delete your account?
          </h2>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Please enter your password to confirm you would
            like to permanently delete your account.
          </p>

          <div className="mt-6">
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
              help={errors.password}
              validateStatus={errors.password ? 'error' : ''}>
              <Input
                id="password"
                type="password"
                className="mt-1 block w-3/4"
                isFocused
                placeholder="Password"
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </section>
  );
};

export default DeleteUserForm;
