import { authUserApi } from '@/services/apis/userApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userKeys } from '@/hooks/queries/user/userQueryKeys';

type UserState = 'userOnly' | 'nonUserOnly';

export default function useUser(userState?: UserState) {
  const { data, error, isFetching } = useQuery({
    queryKey: userKeys.me(),
    queryFn: () => authUserApi.getUser(),
    staleTime: Infinity,
  });

  const nav = useNavigate();

  useEffect(() => {
    if (error) {
      console.error('사용자 데이터 가져오는 중 오류 발생:', error);
      return;
    }
    if (userState === 'nonUserOnly' && data) {
      nav('/');
    }
    if (userState === 'userOnly' && !data) {
      nav('/', { replace: true });
    }
  }, [data, error, nav, userState]);

  return { user: data, isLoading: isFetching };
}
