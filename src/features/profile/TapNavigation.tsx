import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { REGISTER_SELECT } from '@/constants/pathname';
import { useNavigate } from 'react-router-dom';
import TabNavButton from './TabNavButton';
import { useTranslation } from 'react-i18next';

function TapNavigation() {
  const navi = useNavigate();
  const handleGotoRegisterPage = () => navi(REGISTER_SELECT);
  const { t } = useTranslation();
  return (
    <nav className="w-full flex web:justify-start mobile:justify-center items-center web:gap-[30px] mobile:gap-[21px] web:mb-[30px] mobile:mb-[20px]">
      <TabNavButton params="my-logs" navText={t('myProfile.tabNav.myLogs')} />
      <TabNavButton params="saved-spaces" navText={t('myProfile.tabNav.savedSpaces')} />
      <TabNavButton params="saved-logs" navText={t('myProfile.tabNav.savedLogs')} />
      <div>
        <Separator orientation="vertical" className="web:h-[20px] mobile:h-[18px]" />
      </div>
      <Button
        className="rounded-[60px] web:text-text-sm mobile:text-text-xs"
        onClick={handleGotoRegisterPage}
      >
        Upload
      </Button>
    </nav>
  );
}

export default TapNavigation;
