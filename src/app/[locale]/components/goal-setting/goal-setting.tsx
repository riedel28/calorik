'use client';

import { addDays, format, isBefore, type Locale, parseISO, startOfToday } from 'date-fns';
import { de, ru } from 'date-fns/locale';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Calendar } from '@/components/ui/calendar';
import { FieldError, FieldLegend, FieldSet } from '@/components/ui/field';
import { OptionDot, OptionRadio, OptionText } from '@/components/ui/option-radio';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup } from '@/components/ui/radio-group';
import { GOAL_QUALITIES } from '@/lib/calculations';
import { cn } from '@/lib/utils';

import { daysUntilGoal, goalDateFromDays, toIsoDate } from '../projection-form/goal-timeline';
import { FIELD_LABEL_CLASS, NumberField } from '../projection-form/number-field';
import { errorMessageKey, type ProjectionFormValues } from '../projection-form/schema';

const DATE_FNS_LOCALES: Record<string, Locale> = { de, ru };

const INNER_LABEL_CLASS =
  'pointer-events-none absolute top-1.5 left-3 font-semibold text-[11px] text-muted-foreground uppercase tracking-[0.04em]';
const INNER_FIELD_CLASS =
  'h-12 w-full rounded-[10px] bg-card px-3 pt-[17px] text-left font-medium tabular-nums focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring';

const SwapIcon = () => (
  <svg
    aria-hidden="true"
    className="shrink-0 text-primary"
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
);

/**
 * Days and date edit the same value. The form stores only `goalDate`; the days
 * input shows the derived count, keeping the raw text only while it is being typed.
 */
const GoalTimeline = () => {
  const t = useTranslations('goal');
  const tRoot = useTranslations();
  const dateLocale = DATE_FNS_LOCALES[useLocale()];
  const { control } = useFormContext<ProjectionFormValues>();
  const [daysDraft, setDaysDraft] = useState<string | null>(null);
  const today = startOfToday();

  return (
    <Controller
      control={control}
      name="goalDate"
      render={({ field, fieldState }) => {
        const days = daysUntilGoal(field.value, today);
        const daysText = daysDraft ?? (days === null ? '' : String(days));
        const isDraftInvalid =
          daysDraft !== null && daysDraft !== '' && goalDateFromDays(daysDraft, today) === null;
        const selectedDate = field.value ? parseISO(field.value) : undefined;
        const dateErrorKey = errorMessageKey(fieldState.error);

        return (
          <fieldset className="flex min-w-0 flex-[2_1_300px] flex-col gap-2">
            <legend className={cn('mb-2', FIELD_LABEL_CLASS)}>{t('duration')}</legend>
            <div className="flex items-center gap-2 rounded-[14px] border bg-secondary p-1">
              <div className="relative min-w-0 flex-1">
                <label className={INNER_LABEL_CLASS} htmlFor="daysUntilGoal">
                  {t('daysUntilGoal.label')}
                </label>
                <input
                  aria-invalid={isDraftInvalid}
                  className={cn(
                    INNER_FIELD_CLASS,
                    'text-[17px] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                  )}
                  id="daysUntilGoal"
                  inputMode="numeric"
                  onBlur={() => {
                    if (!isDraftInvalid) {
                      setDaysDraft(null);
                    }
                    field.onBlur();
                  }}
                  onChange={(event) => {
                    const text = event.target.value.trim();
                    setDaysDraft(text);
                    field.onChange(goalDateFromDays(text, today) ?? '');
                  }}
                  type="number"
                  value={daysText}
                />
              </div>

              <SwapIcon />

              <div className="relative min-w-0 flex-[1.4_1_0]">
                <span className={INNER_LABEL_CLASS} id="goal-date-label">
                  {t('goalDate.label')}
                </span>
                <Popover>
                  <PopoverTrigger
                    aria-labelledby="goal-date-label goal-date-value"
                    className={cn(INNER_FIELD_CLASS, 'cursor-pointer truncate text-[15px]')}
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
                      disabled={(date) => isBefore(date, addDays(today, 1))}
                      locale={dateLocale}
                      mode="single"
                      onSelect={(date) => {
                        setDaysDraft(null);
                        field.onChange(date ? toIsoDate(date) : '');
                      }}
                      selected={selectedDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {isDraftInvalid && <FieldError>{t('daysUntilGoal.error')}</FieldError>}
            {dateErrorKey && <FieldError>{tRoot(dateErrorKey)}</FieldError>}
          </fieldset>
        );
      }}
    />
  );
};

const GoalSetting = () => {
  const t = useTranslations('goal');
  const { control } = useFormContext<ProjectionFormValues>();

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex flex-wrap items-start gap-3.5">
        <NumberField
          className="flex-[1_1_150px]"
          label={t('goalWeight.label')}
          name="goalWeight"
          step="0.1"
          suffix={t('goalWeight.unit')}
        />
        <GoalTimeline />
      </div>
      <p className="-mt-2.5 text-[13px] text-muted-foreground">{t('syncHint')}</p>

      <Controller
        control={control}
        name="goalQuality"
        render={({ field }) => (
          <FieldSet className="gap-2">
            <FieldLegend className={FIELD_LABEL_CLASS}>{t('quality.label')}</FieldLegend>
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
    </div>
  );
};

export default GoalSetting;
