import { Stack } from '@mantine/core';
import { FormProvider, type FormProviderProps } from 'react-hook-form';

type FormProps = {
  methods: FormProviderProps;
  onSubmit?: (data: any) => void;
  children: React.ReactNode;
};

export const Form = ({ methods, onSubmit, children, ...props }: FormProps) => {
  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <form
        style={{ width: '100%' }}
        onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
        noValidate
        {...props}
      >
        <Stack>{children}</Stack>
      </form>
    </FormProvider>
  );
};
Form.displayName = 'Form';
