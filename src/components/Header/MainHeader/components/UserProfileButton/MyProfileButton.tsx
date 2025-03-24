import { Button } from '@/components/ui/button';
import useUser from '@/hooks/queries/user/useUser';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function MyProfileButton() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const { user } = useUser();

  const onProfileClick = () => {
    const params = user?.userId;
    nav(`/profile/${params}/my-logs`);
  };
  return (
    <Button
      onClick={onProfileClick}
      className="w-full h-full rounded-[60px] bg-[#F7F7F7] hover:bg-[#F7F7F7]"
    >
      <span className="font-medium text-black text-text-sm">{t('profile.viewProfile')}</span>
    </Button>
  );
}

//<Link to="/profile/12/my-logs">
