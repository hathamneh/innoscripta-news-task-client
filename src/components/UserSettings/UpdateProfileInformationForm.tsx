import { useEffect, useState } from 'react';
import Input from '@/ui/Input';
import axios, { csrf } from '@/lib/axios';
import { AuthErrors, useAuth } from '@/hooks/auth';
import { Transition } from '@headlessui/react';
import { Button, Form } from 'antd';

const UpdateProfileInformationForm = () => {
  const { user, resendEmailVerification } = useAuth({ middleware: 'auth' });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<AuthErrors>({});
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const submitForm = async () => {
    await csrf();

    setErrors({});
    setStatus(null);

    axios
      .put('/api/profile', { name: name, email: email })
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
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
          Update your account's profile information and email address
        </p>
      </header>

      <Form onFinish={submitForm} className="mt-6" layout="vertical">
        {/* Name */}
        <Form.Item
          label="Name"
          help={errors.name}
          validateStatus={errors.name ? 'error' : ''}>
          <Input
            type="text"
            name="name"
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
          help={errors.email}
          validateStatus={errors.email ? 'error' : ''}>
          <Input
            type="email"
            name="email"
            value={email}
            className="block mt-1 w-full"
            onChange={event => setEmail(event.target.value)}
            required
            autoFocus
          />
        </Form.Item>

        {user?.must_verify_email && user?.email_verified_at === null && (
          <div>
            <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
              Your email address is unverified.
              <button
                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                onClick={() =>
                  resendEmailVerification({
                    setStatus,
                    setErrors: () => {},
                  })
                }>
                Click here to re-send the verification email.
              </button>
            </p>

            {status === 'verification-link-sent' && (
              <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button type="primary" htmlType="submit">
            Save
          </Button>

          {status === 'profile-updated' && (
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

export default UpdateProfileInformationForm;
