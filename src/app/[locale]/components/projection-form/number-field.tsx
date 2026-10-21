'use client';

import { useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { InputWithSuffix } from '@/components/ui/input-with-suffix';
import { cn } from '@/lib/utils';

import type { ProjectionFormValues } from './schema';

type MessageKey = Parameters<ReturnType<typeof useTranslations>>[0];

export const FIELD_LABEL_CLASS = 'font-medium text-[13px] text-muted-foreground';

interface NumberFieldProps {
  className?: string;
  inputClassName?: string;
  label: string;
  name: 'age' | 'bodyFat' | 'customMultiplier' | 'goalWeight' | 'height' | 'weight';
  placeholder?: string;
  step?: string;
  suffix: string;
}

export const NumberField = ({
  className,
  inputClassName,
  label,
  name,
  placeholder,
  step,
  suffix,
}: NumberFieldProps) => {
  const t = useTranslations();
  const { control } = useFormContext<ProjectionFormValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field className={cn('gap-2', className)} data-invalid={fieldState.invalid}>
          <FieldLabel className={FIELD_LABEL_CLASS} htmlFor={field.name}>
            {label}
          </FieldLabel>
          <InputWithSuffix
            {...field}
            aria-invalid={fieldState.invalid}
            className={inputClassName}
            id={field.name}
            inputMode="decimal"
            onChange={(event) => field.onChange(event.target.value.trim())}
            placeholder={placeholder}
            step={step}
            suffix={suffix}
            type="number"
          />
          {fieldState.error?.message && (
            <FieldError>{t(fieldState.error.message as MessageKey)}</FieldError>
          )}
        </Field>
      )}
    />
  );
};
