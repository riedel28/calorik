'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import { Check, ChevronDown } from 'lucide-react';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

const Select = BaseSelect.Root;

const SelectTrigger = forwardRef<
  ElementRef<typeof BaseSelect.Trigger>,
  ComponentPropsWithoutRef<typeof BaseSelect.Trigger>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Trigger
    className={cn(
      'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  </BaseSelect.Trigger>
));
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = forwardRef<
  ElementRef<typeof BaseSelect.Value>,
  ComponentPropsWithoutRef<typeof BaseSelect.Value>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Value className={cn('text-foreground', className)} ref={ref} {...props}>
    {children}
  </BaseSelect.Value>
));
SelectValue.displayName = 'SelectValue';

const SelectPortal = BaseSelect.Portal;

const SelectPositioner = forwardRef<
  ElementRef<typeof BaseSelect.Positioner>,
  ComponentPropsWithoutRef<typeof BaseSelect.Positioner>
>(({ className, ...props }, ref) => (
  <BaseSelect.Positioner className={cn('z-50', className)} ref={ref} sideOffset={4} {...props} />
));
SelectPositioner.displayName = 'SelectPositioner';

const SelectPopup = forwardRef<
  ElementRef<typeof BaseSelect.Popup>,
  ComponentPropsWithoutRef<typeof BaseSelect.Popup>
>(({ className, ...props }, ref) => (
  <BaseSelect.Popup
    className={cn(
      'relative z-50 max-h-96 w-[var(--anchor-width)] overflow-auto rounded-md border bg-popover text-popover-foreground',
      className
    )}
    ref={ref}
    {...props}
  />
));
SelectPopup.displayName = 'SelectPopup';

const SelectList = forwardRef<
  ElementRef<typeof BaseSelect.List>,
  ComponentPropsWithoutRef<typeof BaseSelect.List>
>(({ className, ...props }, ref) => (
  <BaseSelect.List className={cn('p-1', className)} ref={ref} {...props} />
));
SelectList.displayName = 'SelectList';

const SelectItem = forwardRef<
  ElementRef<typeof BaseSelect.Item>,
  ComponentPropsWithoutRef<typeof BaseSelect.Item>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Item
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <BaseSelect.ItemIndicator>
        <Check className="h-4 w-4" />
      </BaseSelect.ItemIndicator>
    </span>
    <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
  </BaseSelect.Item>
));
SelectItem.displayName = 'SelectItem';

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectPositioner,
  SelectPopup,
  SelectList,
  SelectItem,
};
