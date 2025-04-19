import { HOME } from '@/constants/pathname';
import useUser from '@/hooks/queries/user/useUser';
import { useLoginModalStore } from '@/store/loginStore';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { openLoginModal } = useLoginModalStore();
  const { data: user } = useUser();

  useEffect(() => {
    if (!user) openLoginModal();
  }, [user, openLoginModal]);

  if (!user) return <Navigate to={HOME} replace />;
  return <Outlet />;
};

export default ProtectedRoute;
