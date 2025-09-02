import { MantineProvider } from '@mantine/core';
import { customTheme } from './index';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <MantineProvider theme={customTheme}>{children}</MantineProvider>;
}

export default ThemeProvider;
