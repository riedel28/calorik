'use client';

import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';

import CurrentStats from '../current-stats/current-stats';
import GoalResults from '../goal-results/goal-results';
import GoalSetting from '../goal-setting/goal-setting';
import UnitToggle from '../unit-toggle/unit-toggle';
import UserInputs from '../user-inputs/user-inputs';

export interface ProjectionFormValues {
  units: 'imperial' | 'metric';
  gender: 'male' | 'female';
  height: string;
  weight: string;
  age: string;
  activityLevel: 'none' | 'low' | 'moderate' | 'active' | 'veryActive' | 'custom';
  customMultiplier: string;
  formula: 'katch-mcardle' | 'mifflin-st-jeor';
  bodyFat: string;
  goalWeight: string;
  daysUntilGoal: string;
  goalDate: string;
}

const ProjectionForm = () => {
  const form = useForm<ProjectionFormValues>({
    defaultValues: {
      units: 'metric',
      gender: 'male',
      height: '',
      weight: '',
      age: '',
      activityLevel: 'moderate',
      customMultiplier: '',
      formula: 'mifflin-st-jeor',
      bodyFat: '',
      goalWeight: '',
      daysUntilGoal: '',
      goalDate: '',
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4">
        <UnitToggle />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <UserInputs />
            <CurrentStats />
          </div>
          <div className="space-y-4">
            <GoalSetting />
            <GoalResults />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProjectionForm;
