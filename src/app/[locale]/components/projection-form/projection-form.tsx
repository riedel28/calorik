'use client';

import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';

import CurrentStats from '../current-stats/current-stats';
import GoalResults from '../goal-results/goal-results';
import GoalSetting from '../goal-setting/goal-setting';
import UnitToggle from '../unit-toggle/unit-toggle';
import UserInputs from '../user-inputs/user-inputs';

export interface ProjectionFormValues {
  activityLevel: 'none' | 'low' | 'moderate' | 'active' | 'veryActive' | 'custom';
  age: string;
  bodyFat: string;
  customMultiplier: string;
  daysUntilGoal: string;
  formula: 'katch-mcardle' | 'mifflin-st-jeor';
  gender: 'male' | 'female';
  goalDate: string;
  goalWeight: string;
  height: string;
  units: 'imperial' | 'metric';
  weight: string;
}

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
      goalWeight: '',
      height: '',
      units: 'metric',
      weight: '',
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
