'use client';

import { AppShell, Avatar, Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { Menu } from '@/components/menu';
import { ICONS } from '@/assets/icons';
import NavBar from './sidebar';
import { ConfirmModal } from '@/components';
import Icon from '@/assets/icons/icon';
import { logout } from '@/utils/auth/logout-utils';

const PROFILE_MENU_ITEMS = [
  { id: 'profile', label: 'Profile', icon: ICONS.IconUser },
  { id: 'logout', label: 'Logout', icon: ICONS.IconLogout },
];

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const [mobileDrawerOpened, mobileDrawerHandler] = useDisclosure();
  const [logoutConfirmOpened, logoutConfirmHandler] = useDisclosure();
  const router = useRouter();

  const onItemClick = (id: string) => {
    console.log('Menu item clicked:', id);
    if (id === 'profile') {
      router.push('/account');
    } else if (id === 'logout') {
      logoutConfirmHandler.open();
    }
  };

  const onLogoutConfirm = async () => {
    try {
      // Close the modal first
      logoutConfirmHandler.close();

      // Perform comprehensive logout
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: force redirect to login
      window.location.href = '/login';
    }
  };

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileDrawerOpened },
        }}
        padding='md'
      >
        <AppShell.Header>
          <Container h='100%' size='var(--mantine-breakpoint-xxl)' px={0}>
            <Group h='100%' px='md' justify='space-between'>
              <Group>
                <Burger
                  opened={mobileDrawerOpened}
                  onClick={mobileDrawerHandler.toggle}
                  hiddenFrom='sm'
                  size='sm'
                />
                Logo
              </Group>
              <Menu items={PROFILE_MENU_ITEMS} {...{ onItemClick }}>
                <Avatar
                  size='md'
                  style={{ cursor: 'pointer' }}
                  alt='User profile'
                />
              </Menu>
            </Group>
          </Container>
        </AppShell.Header>
        <AppShell.Navbar p='md'>
          Navbar
          <NavBar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Container size='var(--mantine-breakpoint-xxl)' px={0}>
            {children}
          </Container>
        </AppShell.Main>
      </AppShell>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        opened={logoutConfirmOpened}
        onClose={logoutConfirmHandler.close}
        icon={ICONS.IconLogout}
        title='Logout?'
        message='Are you sure you want to logout?'
        confirmButtonProps={{
          label: 'Logout',
          leftSection: <Icon component={ICONS.IconLogout} size={16} />,
          onClick: onLogoutConfirm,
        }}
      />
    </>
  );
};

export default DashboardWrapper;
