import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Typography',
  description: 'Typography styles and components for the project.',
};

export default function TypographyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
