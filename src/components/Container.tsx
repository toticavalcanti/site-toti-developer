import { cn } from '@/utils';
import { HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export default function Container({
  children,
  size = 'lg',
  className,
  ...props
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-4xl',
    md: 'max-w-6xl',
    lg: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn('mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20', sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
