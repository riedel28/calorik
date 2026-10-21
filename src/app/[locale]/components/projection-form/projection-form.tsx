'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Panel } from '@/components/ui/panel';

import CurrentStats from '../current-stats/current-stats';
import GoalResults from '../goal-results/goal-results';
import GoalSetting from '../goal-setting/goal-setting';
import UserInputs from '../user-inputs/user-inputs';
import { loadStoredFormValues, saveFormValues } from './form-storage';
import { type ProjectionFormValues, projectionFormSchema } from './schema';

const DEFAULT_VALUES: ProjectionFormValues = {
  activityLevel: 'moderate',
  age: '',
  bodyFat: '',
  customMultiplier: '',
  formula: 'mifflin-st-jeor',
  gender: 'male',
  goalDate: '',
  goalQuality: 'optimal',
  goalWeight: '',
  height: '',
  weight: '',
};

const ProjectionForm = () => {
  const t = useTranslations('goal');
  const form = useForm<ProjectionFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
    resolver: zodResolver(projectionFormSchema),
  });

  // Restore after mount (not in defaultValues) so server and client render
  // the same initial markup.
  useEffect(() => {
    const stored = loadStoredFormValues();
    if (stored) {
      form.reset(stored);
      form.trigger();
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch(() => saveFormValues(form.getValues()));
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <FormProvider {...form}>
      <form className="flex flex-wrap items-start gap-6">
        <UserInputs />
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-6">
          <CurrentStats />
          <Panel title={t('title')}>
            <GoalSetting />
            <GoalResults />
          </Panel>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProjectionForm;
