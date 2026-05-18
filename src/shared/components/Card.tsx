import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'subtle';
}

export function Card({ children, variant = 'default', className, ...props }: CardProps) {
  const variants = {
    default: 'bg-white shadow-sm hover:shadow-md transition-shadow duration-300 border border-brand-beige/30',
    subtle: 'bg-brand-beige/30 hover:bg-brand-beige/40 transition-colors duration-300 border border-brand-beige/50',
  };

  return (
    <div
      className={clsx('rounded-lg p-6', variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
