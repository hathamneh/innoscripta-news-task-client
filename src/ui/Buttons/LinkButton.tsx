import { ButtonHTMLAttributes } from 'react';

const LinkButton = ({
  type = 'button',
  className,
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    type={type}
    disabled={disabled}
    className={`link ${disabled && 'opacity-25'} ` + className}>
    {children}
  </button>
);

export default LinkButton;
