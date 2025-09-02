import {
  Anchor as MantineAnchor,
  type AnchorProps as MantineAnchorProps,
} from '@mantine/core';
import Link from 'next/link';
import type { ReactNode } from 'react';

type AnchorProps = {
  children: ReactNode;
  [key: string]: any;
} & MantineAnchorProps;

export const Anchor = ({ to, children, ...props }: AnchorProps) => {
  return (
    <MantineAnchor component={Link} href={to} {...props}>
      {children}
    </MantineAnchor>
  );
};
Anchor.displayName = 'Anchor';
