import { Radio } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

const RadioGroup = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof RadioGroupPrimitive>>(
  ({ className, ...props }, ref) => (
    <RadioGroupPrimitive className={cn('grid gap-2', className)} {...props} ref={ref} />
  ),
);
RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<typeof Radio.Root>>(
  ({ className, children, ...props }, ref) => (
    <Radio.Root
      className={cn(
        'relative flex shrink-0 cursor-pointer items-center justify-center rounded-sm bg-background text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    >
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-primary">
        <Radio.Indicator className="h-2 w-2 rounded-full bg-primary" />
      </span>
    </Radio.Root>
  ),
);
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
