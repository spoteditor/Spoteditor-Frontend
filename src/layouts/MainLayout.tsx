import MainFooter from '@/components/Footer/MainFooter';
import { Outlet } from 'react-router-dom';
import MainHeader from '../components/Header/MainHeader/MainHeader';

const MainLayout = () => {
  return (
    <div className="flex flex-col items-center min-h-screen web:min-w-[1440px] w-ful">
      <MainHeader />
      <div className="w-full grow">
        <Outlet />
      </div>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
