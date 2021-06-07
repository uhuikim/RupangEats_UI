import React from 'react';

type Props = {
  to?: string;
  className?: string;
  disabled?: boolean;
};

export const Redirect: React.FC<Props> = ({
  className,
  to,
  disabled = false,
  children,
  ...props
}) => {
  if (disabled || !to) return <span>{children}</span>;

  return (
    <>
      {typeof to === 'string' && /^https?:\/\//.test(to) ? (
        <a className={className} href={to} rel="noopener noreferrer" target="_blank" {...props}>
          {children}
        </a>
      ) : (
        <a className={className} href={to} {...props}>
          {children}
        </a>
      )}
    </>
  );
};

export default Redirect;
