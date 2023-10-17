import Link, { LinkProps } from 'next/link';
import { Menu } from '@headlessui/react';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import cx from 'classnames';

type Props = {
  isActive?: boolean;
};

const DropdownLink = ({
  children,
  isActive,
  ...props
}: PropsWithChildren<LinkProps & Props>) => (
  <Menu.Item>
    {({ active }) => (
      <Link
        {...props}
        className={`block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out ${
          active || isActive ? 'bg-gray-100 dark:bg-gray-800' : ''
        }`}>
        {children}
      </Link>
    )}
  </Menu.Item>
);

export const DropdownButton = ({
  children,
  className,
  isActive,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & Props>) => (
  <Menu.Item>
    {({ active }) => (
      <button
        className={cx(
          `inline-flex gap-2 items-center w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out ${
            active || isActive ? 'bg-gray-100 dark:bg-gray-800' : ''
          }`,
          className,
        )}
        {...props}>
        {children}
      </button>
    )}
  </Menu.Item>
);

export default DropdownLink;
