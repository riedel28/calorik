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
          'flex h-11 w-full rounded-lg border border-input bg-secondary px-3.5 font-medium text-[17px] tabular-nums [appearance:textfield] file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:font-normal placeholder:text-[15px] placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          suffix && 'pr-12',
          className,
        )}
        ref={ref}
        type={type}
        {...props}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-3.5 select-none text-[13px] text-muted-foreground">
          {suffix}
        </span>
      )}
    </div>
  ),
);
InputWithSuffix.displayName = 'InputWithSuffix';

export { InputWithSuffix };
