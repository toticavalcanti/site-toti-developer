import { cn } from '@/utils';

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function Tag({ children, className, variant = 'primary', size = 'md' }: TagProps) {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    outline: 'bg-transparent text-foreground-secondary border-border hover:border-primary/50',
  };

  const sizes = {
    sm: 'px-3 py-1 text-[10px]',
    md: 'px-4 py-2 text-xs',
    lg: 'px-6 py-3 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-block font-bold rounded-full border transition-all duration-300',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
