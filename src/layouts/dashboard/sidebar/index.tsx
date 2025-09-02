import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavLink, rem } from '@mantine/core';
import { ICONS } from '@/assets/icons';
import Icon from '@/assets/icons/icon';
import { ROLES } from '@/utils/constants';

const SIDEBAR_LINKS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: ICONS.IconHome,
    href: '/dashboard',
    roles: Object.values(ROLES),
  },
  {
    id: 'users',
    label: 'Users',
    icon: ICONS.IconUsers,
    href: '/users',
    roles: [ROLES.ADMIN],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: ICONS.IconSettings,
    href: '/settings',
    roles: Object.values(ROLES),
  },
];

type NavItem = (typeof SIDEBAR_LINKS)[number];

type AccessibleNavItemProps = NavItem & {
  children?: any[];
  roles?: string[];
  id: string | number;
  label: string;
  icon: React.ElementType;
  href: string;
};

const NavBar = ({ mobileDrawerHandler }: any) => {
  const pathname = usePathname();

  const accessibleNavItems = SIDEBAR_LINKS.filter(({ roles }) =>
    roles?.includes('admin')
  );

  return accessibleNavItems.map(
    ({ id, label, icon, href, children }: AccessibleNavItemProps) => {
      const isNested = Boolean(children?.length);

      const isActive = isNested
        ? children?.map(({ href }) => href).includes(pathname)
        : pathname === href;

      return (
        <NavLink
          component={Link}
          key={id}
          {...{ label, href }}
          leftSection={<Icon component={icon} size={18} stroke={1.25} />}
          active={isActive}
          style={{
            borderRadius: 'var(--mantine-radius-default)',
            ...(isActive && {
              border: '1px solid var(--mantine-primary-color-1)',
              fontWeight: 400,
            }),
          }}
          onClick={() => {
            mobileDrawerHandler?.close();
          }}
          w={{ base: '100%', sm: 'auto' }}
          px={{ sm: 8 }}
          py={{ sm: 6 }}
          styles={{
            section: {
              marginInlineEnd: 'var(--mantine-spacing-xs)',
              marginBottom: rem(-1),
            },
          }}
        />
      );
    }
  );
};
export default NavBar;
