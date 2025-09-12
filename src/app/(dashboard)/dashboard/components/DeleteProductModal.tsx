import { Group, Stack, Text } from '@mantine/core';
import { Button, Modal } from '../../../../components';

type DeleteProps = {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export function DeleteProductModal({
  opened,
  onClose,
  onConfirm,
  isLoading,
}: DeleteProps) {
  return (
    <Modal opened={opened} onClose={onClose} title='Delete Product' centered>
      <Stack>
        <Text>Are you sure you want to delete this product?</Text>
        <Group justify='flex-end'>
          <Button variant='default' onClick={onClose}>
            Cancel
          </Button>
          <Button color='red' onClick={onConfirm} loading={isLoading}>
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
