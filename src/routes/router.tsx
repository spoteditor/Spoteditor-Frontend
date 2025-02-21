import MainLayout from '@/layouts/MainLayout';
import DetailPage from '@/pages/detail';
import HomePage from '@/pages/home';
import KakaoAuthTest from '@/pages/Login/KakaoAuthTest';
import Notice from '@/pages/notice';
import NoticeDetail from '@/pages/notice/notice-detail';
import Profile from '@/pages/profile';
import ProfileSetting from '@/pages/profile-setting';
import MyLogs from '@/pages/profile/my-logs';
import SavedLogs from '@/pages/profile/saved-logs';
import SavedSpaces from '@/pages/profile/saved-spaces';
import Search from '@/pages/search';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/kakaoAuthTest', element: <KakaoAuthTest /> },
      { path: '/search', element: <Search /> },
      { path: '/detail/:placeId', element: <DetailPage /> },
      {
        path: '/profile/:userId',
        element: <Profile />,
        children: [
          {
            path: 'my-logs',
            element: <MyLogs />,
          },
          {
            path: 'saved-logs',
            element: <SavedLogs />,
          },
          {
            path: 'saved-spaces',
            element: <SavedSpaces />,
          },
        ],
      },
      {
        path: 'profile-setting',
        element: <ProfileSetting />,
      },
      {
        path: 'notice',
        element: <Notice />,
      },
      {
        path: 'notice/:noticeId',
        element: <NoticeDetail />,
      },
    ],
  },
]);

export default router;
