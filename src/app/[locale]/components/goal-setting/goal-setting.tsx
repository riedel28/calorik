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
import { useLocale, useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';

import { Calendar } from '@/components/ui/calendar';
import { FieldError, FieldLegend, FieldSet } from '@/components/ui/field';
import { OptionDot, OptionRadio, OptionText } from '@/components/ui/option-radio';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup } from '@/components/ui/radio-group';
import { LIMITS } from '@/lib/calculations';

import { FIELD_LABEL_CLASS, NumberField } from '../projection-form/number-field';
import type { ProjectionFormValues } from '../projection-form/schema';

type MessageKey = Parameters<ReturnType<typeof useTranslations>>[0];

const DATE_FNS_LOCALES: Record<string, Locale> = { de, ru };
const GOAL_QUALITIES = ['optimal', 'moderate', 'poor'] as const;

const INNER_LABEL_CLASS =
  'pointer-events-none absolute top-1.5 left-3 font-semibold text-[11px] text-muted-foreground uppercase tracking-[0.04em]';
const INNER_FIELD_CLASS =
  'h-12 w-full rounded-[10px] bg-card px-3 pt-[17px] text-left font-medium tabular-nums focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring';

const GoalSetting = () => {
  const t = useTranslations('goal');
  const tRoot = useTranslations();
  const locale = useLocale();
  const dateLocale = DATE_FNS_LOCALES[locale];
  const { control, formState, setValue } = useFormContext<ProjectionFormValues>();
  const durationErrors = [formState.errors.daysUntilGoal, formState.errors.goalDate]
    .map((error) => error?.message)
    .filter((message): message is string => Boolean(message));

  return (
    <>
      <h2 className="font-semibold text-[17px]" id="goal-title">
        {t('title')}
      </h2>

      <div className="flex flex-wrap items-start gap-3.5">
        <NumberField
          className="flex-[1_1_150px]"
          label={t('goalWeight.label')}
          name="goalWeight"
          step="0.1"
          suffix={t('goalWeight.unit')}
        />

        <fieldset className="flex min-w-0 flex-[2_1_300px] flex-col gap-2">
          <legend className={`mb-2 ${FIELD_LABEL_CLASS}`}>{t('duration')}</legend>
          <div className="flex items-center gap-2 rounded-[14px] border bg-secondary p-1">
            <Controller
              control={control}
              name="daysUntilGoal"
              render={({ field, fieldState }) => (
                <div className="relative min-w-0 flex-1">
                  <label className={INNER_LABEL_CLASS} htmlFor={field.name}>
                    {t('daysUntilGoal.label')}
                  </label>
                  <input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    className={`${INNER_FIELD_CLASS} text-[17px] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                    id={field.name}
                    inputMode="numeric"
                    onChange={(event) => {
                      const value = event.target.value.trim();
                      field.onChange(value);
                      const days = Number(value);
                      const isValidDays =
                        value !== '' &&
                        Number.isInteger(days) &&
                        days >= LIMITS.daysUntilGoal.min &&
                        days <= LIMITS.daysUntilGoal.max;
                      setValue(
                        'goalDate',
                        isValidDays ? format(addDays(startOfToday(), days), 'yyyy-MM-dd') : '',
                        { shouldValidate: true },
                      );
                    }}
                    type="number"
                  />
                </div>
              )}
            />

            <span className="flex text-primary">
              <svg
                aria-hidden="true"
                fill="none"
                height="22"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="22"
              >
                <path d="M4 9h15l-4-4M20 15H5l4 4" />
              </svg>
            </span>

            <Controller
              control={control}
              name="goalDate"
              render={({ field }) => {
                const selectedDate = field.value ? parseISO(field.value) : undefined;
                return (
                  <div className="relative min-w-0 flex-[1.4_1_0]">
                    <span className={INNER_LABEL_CLASS} id="goal-date-label">
                      {t('goalDate.label')}
                    </span>
                    <Popover>
                      <PopoverTrigger
                        aria-labelledby="goal-date-label goal-date-value"
                        className={`${INNER_FIELD_CLASS} cursor-pointer truncate text-[15px]`}
                      >
                        <span
                          className={selectedDate ? undefined : 'text-muted-foreground'}
                          id="goal-date-value"
                        >
                          {selectedDate
                            ? format(selectedDate, 'PP', { locale: dateLocale })
                            : t('goalDate.placeholder')}
                        </span>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-auto overflow-hidden p-0">
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
                  </div>
                );
              }}
            />
          </div>
          {durationErrors.map((message) => (
            <FieldError key={message}>{tRoot(message as MessageKey)}</FieldError>
          ))}
        </fieldset>
      </div>
      <p className="-mt-2.5 text-[13px] text-muted-foreground">{t('syncHint')}</p>

      <Controller
        control={control}
        name="goalQuality"
        render={({ field }) => (
          <FieldSet className="gap-2">
            <FieldLegend className={FIELD_LABEL_CLASS} variant="label">
              {t('quality.label')}
            </FieldLegend>
            <RadioGroup
              className="flex flex-col gap-1.5"
              onValueChange={field.onChange}
              value={field.value}
            >
              {GOAL_QUALITIES.map((quality) => (
                <OptionRadio key={quality} value={quality}>
                  <OptionDot />
                  <OptionText
                    description={t(`quality.${quality}Description`)}
                    label={t(`quality.${quality}`)}
                  />
                </OptionRadio>
              ))}
            </RadioGroup>
          </FieldSet>
        )}
      />
    </>
  );
};

export default GoalSetting;
