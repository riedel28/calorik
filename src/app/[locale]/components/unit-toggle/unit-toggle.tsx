'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import type { ProjectionFormValues } from '../projection-form/projection-form';

const UnitToggle = () => {
  const t = useTranslations('units');
  const { watch, setValue } = useFormContext<ProjectionFormValues>();
  const units = watch('units');

  const isMetric = units === 'metric';

  return (
    <div className="flex items-center justify-end gap-3">
      <Label
        className={isMetric ? 'text-muted-foreground' : 'font-semibold text-foreground'}
        htmlFor="unit-toggle"
      >
        {t('imperial')}
      </Label>
      <Switch
        checked={isMetric}
        id="unit-toggle"
        onCheckedChange={(checked) => setValue('units', checked ? 'metric' : 'imperial')}
      />
      <Label
        className={isMetric ? 'font-semibold text-foreground' : 'text-muted-foreground'}
        htmlFor="unit-toggle"
      >
        {t('metric')}
      </Label>
    </div>
  );
};

export default UnitToggle;
