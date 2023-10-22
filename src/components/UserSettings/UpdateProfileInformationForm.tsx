import { FormEventHandler, useEffect, useState } from 'react';
import Input from '@/ui/Input';
import InputError from '@/ui/InputError';
import Label from '@/ui/Label';
import axios, { csrf } from '@/lib/axios';
import { AuthErrors, useAuth } from '@/hooks/auth';
import { Transition } from '@headlessui/react';
import { Button } from 'antd';

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

  const submitForm: FormEventHandler = async event => {
    event.preventDefault();

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

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update your account's profile information and email address
        </p>
      </header>

      <form onSubmit={submitForm} className="mt-6 space-y-6">
        {/* Name */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={name}
            className="block mt-1 w-full"
            onChange={event => setName(event.target.value)}
            required
            autoFocus
          />
          <InputError messages={errors.email} className="mt-2" />
        </div>
        {/* Email Address */}
        <div>
          <Label htmlFor="email">Email</Label>
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

          <InputError messages={errors.email} className="mt-2" />
        </div>

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
      </form>
    </section>
  );
};

export default UpdateProfileInformationForm;
