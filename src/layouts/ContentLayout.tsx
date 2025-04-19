import MainFooter from '@/components/Footer/MainFooter';
import MainHeader from '@/components/Header/MainHeader/MainHeader';
import { Outlet, useLocation } from 'react-router-dom';

export default function ContentLayout() {
  const { pathname } = useLocation();
  const isNoticePage = pathname.startsWith('/notice');
  return (
    <>
      {!isNoticePage && <MainHeader />}
      <div className="w-full grow">
        <Outlet />
      </div>
      {!isNoticePage && <MainFooter />}
    </>
  );
}
