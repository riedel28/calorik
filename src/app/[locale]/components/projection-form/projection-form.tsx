'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';

import CurrentStats from '../current-stats/current-stats';
import GoalResults from '../goal-results/goal-results';
import GoalSetting from '../goal-setting/goal-setting';
import UserInputs from '../user-inputs/user-inputs';
import { loadStoredFormValues, saveFormValues } from './form-storage';
import { type ProjectionFormValues, projectionFormSchema } from './schema';

export type { ProjectionFormValues } from './schema';

const ProjectionForm = () => {
  const form = useForm<ProjectionFormValues>({
    defaultValues: {
      activityLevel: 'moderate',
      age: '',
      bodyFat: '',
      customMultiplier: '',
      daysUntilGoal: '',
      formula: 'mifflin-st-jeor',
      gender: 'male',
      goalDate: '',
      goalQuality: 'optimal',
      goalWeight: '',
      height: '',
      weight: '',
    },
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
    const subscription = form.watch((values) => {
      saveFormValues(values as ProjectionFormValues);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form className="flex flex-wrap items-start gap-6">
        <UserInputs />
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-6">
          <CurrentStats />
          <section
            aria-labelledby="goal-title"
            className="flex flex-col gap-[18px] rounded-xl border bg-card p-5"
          >
            <GoalSetting />
            <GoalResults />
          </section>
        </div>
      </form>
    </Form>
  );
};

export default ProjectionForm;
