import { cn } from '@/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    asChild = false, 
    children, 
    onDrag, 
    onDragEnd, 
    onDragStart,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    onTransitionEnd,
    ...props 
  }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/50 hover:scale-105',
      secondary:
        'bg-background-secondary text-foreground border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/30',
      outline:
        'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white',
    };

    const sizes = {
      sm: 'px-4 py-2.5 text-sm gap-2',
      md: 'px-6 py-3 text-base gap-2.5',
      lg: 'px-8 py-3.5 text-lg gap-3',
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (asChild) {
      return (
        <Slot
          ref={ref as any}
          className={classes}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onAnimationStart={onAnimationStart}
          onAnimationEnd={onAnimationEnd}
          onAnimationIteration={onAnimationIteration}
          onTransitionEnd={onTransitionEnd}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
