import {
  Modal as MantineModal,
  ScrollArea,
  Title,
  type ModalProps as MantineModalProps,
} from '@mantine/core';

type ModalProps = {
  opened: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
} & MantineModalProps;

export const Modal = ({
  opened,
  onClose,
  title = '',
  children,
  size = 'lg',
  ...props
}: ModalProps) => {
  return (
    <MantineModal
      w='100%'
      {...{ opened, onClose, size }}
      title={
        title && (
          <Title component='span' order={4}>
            {title}
          </Title>
        )
      }
      scrollAreaComponent={ScrollArea.Autosize}
      {...props}
    >
      {children}
    </MantineModal>
  );
};
Modal.displayName = 'Modal';
