'use client';

import {
  Button,
  Card,
  Text,
  Title,
  Badge,
  Group,
  Stack,
  Grid,
  Paper,
  ColorSwatch,
  Divider,
  Container,
  Box,
} from '@mantine/core';
import { customColors, semanticColors } from '@/theme/colors';

export function ThemeDemo() {
  // Use static semantic colors to prevent hydration mismatch
  const themeSemanticColors = semanticColors;

  const colorPalettes = [
    { name: 'Primary (Blue)', colors: customColors.primary },
    { name: 'Secondary (Purple)', colors: customColors.secondary },
    { name: 'Accent (Teal)', colors: customColors.accent },
    { name: 'Success (Green)', colors: customColors.success },
    { name: 'Warning (Orange)', colors: customColors.warning },
    { name: 'Error (Red)', colors: customColors.error },
    { name: 'Neutral (Gray)', colors: customColors.neutral },
  ];

  return (
    <Container size='xl' py='xl'>
      <Stack gap='xl'>
        <div>
          <Title order={1} mb='sm'>
            Custom Mantine Theme Demo
          </Title>
          <Text c='dimmed' size='lg'>
            Showcasing the custom theme with beautiful colors, typography, and
            components.
          </Text>
        </div>

        <Divider />

        {/* Typography Section */}
        <div>
          <Title order={2} mb='md'>
            Typography
          </Title>
          <Stack gap='sm'>
            <Title order={1}>Heading 1 - Main Title</Title>
            <Title order={2}>Heading 2 - Section Title</Title>
            <Title order={3}>Heading 3 - Subsection</Title>
            <Title order={4}>Heading 4 - Component Title</Title>
            <Title order={5}>Heading 5 - Small Title</Title>
            <Title order={6}>Heading 6 - Smallest Title</Title>
            <Text size='xl'>Extra large text</Text>
            <Text size='lg'>Large text</Text>
            <Text size='md'>Medium text (default)</Text>
            <Text size='sm'>Small text</Text>
            <Text size='xs'>Extra small text</Text>
          </Stack>
        </div>

        <Divider />

        {/* Color Palette Section */}
        <div>
          <Title order={2} mb='md'>
            Color Palette
          </Title>
          <Grid>
            {colorPalettes.map(palette => (
              <Grid.Col key={palette.name} span={{ base: 12, md: 6, lg: 4 }}>
                <Paper p='md' withBorder>
                  <Text fw={500} mb='sm'>
                    {palette.name}
                  </Text>
                  <Group gap='xs'>
                    {palette.colors.map((color, index) => (
                      <ColorSwatch
                        key={index}
                        color={color}
                        size={24}
                        style={{ cursor: 'pointer' }}
                        title={`Shade ${index}: ${color}`}
                      />
                    ))}
                  </Group>
                </Paper>
              </Grid.Col>
            ))}
          </Grid>
        </div>

        <Divider />

        {/* Components Section */}
        <div>
          <Title order={2} mb='md'>
            Components
          </Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card padding='lg' radius='md' withBorder>
                <Title order={4} mb='sm'>
                  Buttons
                </Title>
                <Stack gap='sm'>
                  <Group>
                    <Button variant='filled'>Filled Button</Button>
                    <Button variant='light'>Light Button</Button>
                    <Button variant='outline'>Outline Button</Button>
                    <Button variant='subtle'>Subtle Button</Button>
                  </Group>
                  <Group>
                    <Button color='secondary' variant='filled'>
                      Secondary
                    </Button>
                    <Button color='accent' variant='filled'>
                      Accent
                    </Button>
                    <Button color='success' variant='filled'>
                      Success
                    </Button>
                    <Button color='warning' variant='filled'>
                      Warning
                    </Button>
                    <Button color='error' variant='filled'>
                      Error
                    </Button>
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card padding='lg' radius='md' withBorder>
                <Title order={4} mb='sm'>
                  Badges
                </Title>
                <Group>
                  <Badge variant='filled'>Filled</Badge>
                  <Badge variant='light'>Light</Badge>
                  <Badge variant='outline'>Outline</Badge>
                  <Badge variant='dot'>Dot</Badge>
                  <Badge color='secondary'>Secondary</Badge>
                  <Badge color='accent'>Accent</Badge>
                  <Badge color='success'>Success</Badge>
                  <Badge color='warning'>Warning</Badge>
                  <Badge color='error'>Error</Badge>
                </Group>
              </Card>
            </Grid.Col>

            <Grid.Col span={12}>
              <Card padding='xl' radius='md' withBorder>
                <Title order={4} mb='md'>
                  Feature Card Example
                </Title>
                <Text c='dimmed' mb='lg'>
                  This card demonstrates the custom theme with enhanced shadows,
                  borders, and hover effects. The typography uses the custom
                  Poppins font family for a modern, clean look.
                </Text>
                <Group>
                  <Button variant='filled' size='md'>
                    Get Started
                  </Button>
                  <Button variant='outline' size='md'>
                    Learn More
                  </Button>
                </Group>
              </Card>
            </Grid.Col>
          </Grid>
        </div>

        <Divider />

        {/* Semantic Colors Section */}
        <div>
          <Title order={2} mb='md'>
            Semantic Colors
          </Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper p='md' withBorder>
                <Text fw={500} mb='sm'>
                  Text Colors
                </Text>
                <Stack gap='xs'>
                  <Box>
                    <Text c='dimmed' size='sm'>
                      Primary Text
                    </Text>
                    <Text style={{ color: themeSemanticColors.textPrimary }}>
                      This is primary text color
                    </Text>
                  </Box>
                  <Box>
                    <Text c='dimmed' size='sm'>
                      Secondary Text
                    </Text>
                    <Text style={{ color: themeSemanticColors.textSecondary }}>
                      This is secondary text color
                    </Text>
                  </Box>
                  <Box>
                    <Text c='dimmed' size='sm'>
                      Muted Text
                    </Text>
                    <Text style={{ color: themeSemanticColors.textMuted }}>
                      This is muted text color
                    </Text>
                  </Box>
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper p='md' withBorder>
                <Text fw={500} mb='sm'>
                  Background Colors
                </Text>
                <Stack gap='xs'>
                  <Paper
                    p='sm'
                    style={{
                      backgroundColor: themeSemanticColors.backgroundSecondary,
                    }}
                  >
                    <Text size='sm'>Secondary Background</Text>
                  </Paper>
                  <Paper
                    p='sm'
                    style={{
                      backgroundColor: themeSemanticColors.backgroundTertiary,
                    }}
                  >
                    <Text size='sm'>Tertiary Background</Text>
                  </Paper>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </div>
      </Stack>
    </Container>
  );
}

export default ThemeDemo;
