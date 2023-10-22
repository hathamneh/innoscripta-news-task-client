"use client";

import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren, useEffect, useState } from "react";

type ActiveLinkProps = LinkProps & {
  className?: string;
  activeClassName: string;
};

const ActiveLink = ({
  children,
  activeClassName,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const pathName = usePathname();
  const [computedClassName, setComputedClassName] = useState(className);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (pathName) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href,
      ).pathname;

      const newClassName =
        linkPathname === pathName
          ? `${className} ${activeClassName}`.trim()
          : className;

      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName);
      }
    }
  }, [
    pathName,
    props.as,
    props.href,
    activeClassName,
    className,
    computedClassName,
  ]);

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;
