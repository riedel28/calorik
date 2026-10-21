import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

const RadioGroup = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof RadioGroupPrimitive>>(
  ({ className, ...props }, ref) => (
    <RadioGroupPrimitive className={cn('grid gap-2', className)} {...props} ref={ref} />
  ),
);
RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
