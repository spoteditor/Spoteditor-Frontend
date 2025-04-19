import ContentLayout from '@/layouts/ContentLayout';
import { ScrollRestoration } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex flex-col items-center web:min-w-[1440px] w-full h-dvh">
      <ScrollRestoration />
      <ContentLayout />
    </div>
  );
};

export default MainLayout;
