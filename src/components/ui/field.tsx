import type { ComponentProps } from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

function FieldSet({ className, ...props }: ComponentProps<'fieldset'>) {
  return <fieldset className={cn('flex flex-col', className)} data-slot="field-set" {...props} />;
}

function FieldLegend({ className, ...props }: ComponentProps<'legend'>) {
  return <legend className={cn('mb-1 font-medium text-sm', className)} {...props} />;
}

function Field({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex w-full flex-col gap-1 data-[invalid=true]:text-destructive', className)}
      data-slot="field"
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: ComponentProps<typeof Label>) {
  return <Label className={cn('leading-snug', className)} {...props} />;
}

function FieldError({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('font-normal text-destructive text-sm', className)}
      data-slot="field-error"
      role="alert"
      {...props}
    />
  );
}

export { Field, FieldError, FieldLabel, FieldLegend, FieldSet };
