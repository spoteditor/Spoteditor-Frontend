import MainLayout from '@/layouts/MainLayout';
import RegisterLayout from '@/layouts/RegisterLayout';
import DetailPage from '@/pages/Detail/DetailPage';
import PlacesCollectionPage from '@/pages/Detail/PlacesCollectionPage';
import NotFoundPage from '@/pages/Error/NotFoundPage';
import HomePage from '@/pages/Home/HomePage';
import Notice from '@/pages/notice';
import NoticeDetail from '@/pages/notice/notice-detail';
import Profile from '@/pages/profile';
import ProfileSetting from '@/pages/profile-setting';
import MyLogs from '@/pages/profile/my-logs';
import SavedLogs from '@/pages/profile/saved-logs';
import SavedSpaces from '@/pages/profile/saved-spaces';
import {
  EditPage,
  MapPage,
  NewPlacePage,
  SearchPage,
  SelectPage,
  WritePage,
} from '@/pages/Register';
import LogWritePage from '@/pages/Register/LogWritePage';
import Search from '@/pages/search';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/search', element: <Search /> },
      { path: '/log/:placeLogId', element: <DetailPage /> },
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
  {
    element: <RegisterLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '/register/select', element: <SelectPage /> },
      { path: '/register/search', element: <SearchPage /> },
      { path: '/register/details', element: <LogWritePage /> },
      { path: '/register/maps', element: <MapPage /> },
      { path: '/register/newPlace', element: <NewPlacePage /> },
      { path: '/write', element: <WritePage /> },
      { path: '/register/edit/:placeLogId', element: <EditPage /> },
    ],
  },
  {
    path: '/log/:placeLogId/placesCollection',
    element: <PlacesCollectionPage />,
    errorElement: <NotFoundPage />,
  },
]);

export default router;
