import { Indicator, Item, Root } from '@radix-ui/react-radio-group';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

const RadioGroup = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => (
    <Root className={cn('grid gap-2', className)} {...props} ref={ref} />
  )
);
RadioGroup.displayName = Root.displayName;

const RadioGroupItem = forwardRef<ElementRef<typeof Item>, ComponentPropsWithoutRef<typeof Item>>(
  ({ className, children, ...props }, ref) => (
    <Item
      className={cn(
        'relative flex shrink-0 cursor-pointer items-center justify-center rounded-sm bg-background text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    >
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-primary">
        <Indicator className="h-2 w-2 rounded-full bg-primary" />
      </span>
    </Item>
  )
);
RadioGroupItem.displayName = Item.displayName;

export { RadioGroup, RadioGroupItem };
