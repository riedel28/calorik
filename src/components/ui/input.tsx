import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => (
  <input
    className={cn(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2.5 text-sm [appearance:textfield] file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
      className,
    )}
    ref={ref}
    type={type}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
