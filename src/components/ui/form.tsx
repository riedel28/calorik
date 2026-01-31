import { Slot } from '@radix-ui/react-slot';
import {
  createContext,
  forwardRef,
  type HTMLAttributes,
  type LabelHTMLAttributes,
  useContext,
  useId,
} from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

import { cn } from '@/lib/utils';

const Form = FormProvider;

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formMessageId: `${id}-form-message`,
    formDescriptionId: `${id}-form-description`,
    ...fieldState,
  };
};

interface FormItemContextValue {
  id: string;
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div className={cn('space-y-2', className)} ref={ref} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = 'FormItem';

const FormLabel = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, children, ...props }, ref) => {
    const { formDescriptionId, id } = useFormField();

    return (
      <label
        aria-describedby={formDescriptionId}
        className={cn(
          'font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className
        )}
        htmlFor={id}
        ref={ref}
        {...props}
      >
        {children}
      </label>
    );
  }
);
FormLabel.displayName = 'FormLabel';

const FormControl = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => {
    const { id } = useFormField();

    return (
      <Slot
        aria-describedby={`${id}-form-description ${id}-form-message`}
        id={id}
        ref={ref}
        {...props}
      />
    );
  }
);
FormControl.displayName = 'FormControl';

const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { formMessageId, error } = useFormField();
    const body = error ? String(error.message) : null;

    if (!(body || children)) {
      return null;
    }

    return (
      <p
        className={cn('font-medium text-destructive text-sm', className)}
        id={formMessageId}
        ref={ref}
        {...props}
      >
        {children ?? body}
      </p>
    );
  }
);
FormMessage.displayName = 'FormMessage';

export { Form, FormItem, FormLabel, FormControl, FormMessage, FormField };
