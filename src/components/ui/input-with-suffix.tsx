'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface InputWithSuffixProps extends InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
}

const InputWithSuffix = forwardRef<HTMLInputElement, InputWithSuffixProps>(
  ({ className, type, suffix, ...props }, ref) => (
    <div className="relative flex items-center">
      <input
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          suffix && 'pr-12',
          className
        )}
        ref={ref}
        type={type}
        {...props}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-3 select-none text-muted-foreground text-sm">
          {suffix}
        </span>
      )}
    </div>
  )
);
InputWithSuffix.displayName = 'InputWithSuffix';

export { InputWithSuffix };
