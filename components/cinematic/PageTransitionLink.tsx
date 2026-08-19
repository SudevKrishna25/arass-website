'use client';

import React from 'react';
import Link from 'next/link';
import { useCinematicTransition } from './CinematicPageTransition';

interface PageTransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  direction?: 'forward' | 'backward' | 'vertical' | 'center' | 'diagonal';
  cursor?: string;
}

export function PageTransitionLink({
  href,
  children,
  className,
  direction = 'forward',
  cursor,
  onClick,
  ...props
}: PageTransitionLinkProps) {
  const { triggerTransition } = useCinematicTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If external link or hash link, let normal click proceed
    if (href.startsWith('http') || href.startsWith('#')) {
      if (onClick) onClick(e);
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);
    triggerTransition(href, direction);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      data-cursor={cursor}
      {...props}
    >
      {children}
    </Link>
  );
}
