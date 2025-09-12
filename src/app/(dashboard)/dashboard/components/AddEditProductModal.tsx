'use client';

import { TextInput, Group, Stack } from '@mantine/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal } from '../../../../components';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.number().positive('Price must be positive'),
});

type ProductFormValues = z.infer<typeof productSchema>;

type AddEditProps = {
  opened: boolean;
  onClose: () => void;
  initialValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  isLoading?: boolean;
  mode: 'add' | 'edit';
};

export function AddEditProductModal({
  opened,
  onClose,
  initialValues,
  onSubmit,
  isLoading,
  mode,
}: AddEditProps) {
  const { register, handleSubmit, formState, reset } =
    useForm<ProductFormValues>({
      resolver: zodResolver(productSchema),
      defaultValues: initialValues ?? { title: '', price: 0 },
    });

  // Reset when initialValues change
  React.useEffect(() => {
    reset(initialValues ?? { title: '', price: 0 });
  }, [initialValues, reset]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={mode === 'add' ? 'Add Product' : 'Edit Product'}
      size='md'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label='Title'
            placeholder='Enter product title'
            {...register('title')}
            error={formState.errors.title?.message}
          />
          <TextInput
            label='Price'
            placeholder='Enter product price'
            type='number'
            {...register('price', { valueAsNumber: true })}
            error={formState.errors.price?.message}
          />
          <Group justify='flex-end'>
            <Button variant='default' onClick={onClose}>
              Cancel
            </Button>
            <Button
              type='submit'
              loading={isLoading}
              disabled={isLoading || !formState.isValid}
            >
              {mode === 'add' ? 'Add' : 'Save'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
