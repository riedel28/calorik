'use client';

import {
  addDays,
  differenceInCalendarDays,
  format,
  isBefore,
  type Locale,
  parseISO,
  startOfToday,
} from 'date-fns';
import { de, ru } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputWithSuffix } from '@/components/ui/input-with-suffix';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LIMITS } from '@/lib/calculations';
import { cn } from '@/lib/utils';

import type { ProjectionFormValues } from '../projection-form/projection-form';

type MessageKey = Parameters<ReturnType<typeof useTranslations>>[0];

const DATE_FNS_LOCALES: Record<string, Locale> = { de, ru };

const GoalSetting = () => {
  const t = useTranslations('goal');
  const tErrors = useTranslations();
  const locale = useLocale();
  const dateLocale = DATE_FNS_LOCALES[locale];
  const { control, setValue } = useFormContext<ProjectionFormValues>();

  return (
    <section className="rounded-lg bg-background p-4 shadow-xs ring-1 ring-black/5 sm:p-5">
      <div className="mb-4 space-y-0.5">
        <h2 className="font-semibold text-foreground text-xl">{t('title')}</h2>
      </div>

      <FieldGroup className="gap-3">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          <Controller
            control={control}
            name="goalWeight"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{t('goalWeight.label')}</FieldLabel>
                <InputWithSuffix
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className="h-9"
                  data-testid="goal-weight"
                  id={field.name}
                  inputMode="numeric"
                  onChange={(event) => {
                    const numericValue = event.target.value.trim();
                    field.onChange(numericValue === '' ? '' : numericValue);
                  }}
                  placeholder="0"
                  suffix="kg"
                  type="number"
                />
                {fieldState.invalid && (
                  <FieldError errors={fieldState.error ? [fieldState.error] : []}>
                    {fieldState.error?.message && tErrors(fieldState.error.message as MessageKey)}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="daysUntilGoal"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{t('daysUntilGoal.label')}</FieldLabel>
                <InputWithSuffix
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className="h-9"
                  data-testid="days-until-goal"
                  id={field.name}
                  inputMode="numeric"
                  onChange={(event) => {
                    const numericValue = event.target.value.trim();
                    field.onChange(numericValue === '' ? '' : numericValue);
                    const days = Number(numericValue);
                    const isValidDays =
                      numericValue !== '' &&
                      Number.isInteger(days) &&
                      days >= LIMITS.daysUntilGoal.min &&
                      days <= LIMITS.daysUntilGoal.max;
                    setValue(
                      'goalDate',
                      isValidDays ? format(addDays(startOfToday(), days), 'yyyy-MM-dd') : '',
                      { shouldValidate: true },
                    );
                  }}
                  placeholder="0"
                  suffix={t('daysUntilGoal.unit')}
                  type="number"
                />
                {fieldState.invalid && (
                  <FieldError errors={fieldState.error ? [fieldState.error] : []}>
                    {fieldState.error?.message && tErrors(fieldState.error.message as MessageKey)}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="goalDate"
            render={({ field, fieldState }) => {
              const selectedDate = field.value ? parseISO(field.value) : undefined;
              return (
                <Field className="col-span-2 md:col-span-1" data-invalid={fieldState.invalid}>
                  <FieldLabel>{t('goalDate.label')}</FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className={cn(
                          'h-9 w-full justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                        data-testid="goal-date"
                        variant="outline"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(selectedDate as Date, 'PPP', { locale: dateLocale })
                          : t('goalDate.placeholder')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto overflow-hidden p-0">
                      <Calendar
                        defaultMonth={selectedDate}
                        disabled={(date) => isBefore(date, addDays(startOfToday(), 1))}
                        locale={dateLocale}
                        mode="single"
                        onSelect={(date) => {
                          field.onChange(date ? format(date, 'yyyy-MM-dd') : '');
                          setValue(
                            'daysUntilGoal',
                            date ? String(differenceInCalendarDays(date, startOfToday())) : '',
                            { shouldValidate: true },
                          );
                        }}
                        selected={selectedDate}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={fieldState.error ? [fieldState.error] : []}>
                      {fieldState.error?.message && tErrors(fieldState.error.message as MessageKey)}
                    </FieldError>
                  )}
                </Field>
              );
            }}
          />
        </div>
      </FieldGroup>
    </section>
  );
};

export default GoalSetting;
