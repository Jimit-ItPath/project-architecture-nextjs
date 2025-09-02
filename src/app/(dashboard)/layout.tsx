import DashboardWrapper from '@/layouts/dashboard';

export const metadata = {
  title: 'Next.js | Architecture',
  description: 'Dashboard layout for the Project Architecture Next.js Template',
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardWrapper>{children}</DashboardWrapper>;
};
export default DashboardLayout;
