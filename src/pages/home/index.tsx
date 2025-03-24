import MainCarousel from '@/components/Carousel/MainCarousel';
import { Button } from '@/components/ui/button';
import { REGISTER_SELECT } from '@/constants/pathname';
import MainHero from '@/features/home-page/MainHero';
import TypingText from '@/features/home-page/TypingText';
import { MoveUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainPageLogCardList from '../detail-page/components/MainPageLogCardList';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const navi = useNavigate();
  const { t } = useTranslation();
  const handleGotoRegisterPage = () => navi(REGISTER_SELECT);

  return (
    <>
      {/* 메인 히어로 */}
      <MainHero />

      <div className="flex flex-col px-4 web:px-[50px]">
        {/* 제목 */}
        <div className="flex items-end justify-between mt-10 mb-6 font-untitled">
          <div className="text-xl font-semibold web:text-2xl">
            <h3 className="text-primary-300">Sort by</h3>
            <h3 className="text-primary-950">Popularity</h3>
          </div>
        </div>

        {/* 컨테이너 */}
        <MainCarousel />

        {/* 에디터 설명 */}
        <div className="flex flex-col justify-center my-20 web:grid web:grid-cols-2 border-primary-100 web:gap-7">
          <div className="py-[18px] border-t border-b flex flex-col justify-center web:py-10">
            <TypingText text={t('home.editor.typingText')} />

            <div className="flex my-[15px]">
              <Button
                className="rounded-full text-text-sm text-white py-2.5 px-6 web:text-text-md web:py-3"
                onClick={handleGotoRegisterPage}
              >
                {t('home.editor.registerButton')}
              </Button>
              <Button
                fullRounded
                onClick={handleGotoRegisterPage}
                className="h-full p-0 aspect-square"
              >
                <MoveUpRight strokeWidth={3} />
              </Button>
            </div>
          </div>

          <div className="flex-col  text-primary-300 text-text-sm web:border-t border-b border-primary-100 py-[18px] web:h-full flex justify-center web:text-text-lg web:font-regular">
            {(t('home.editor.desc', { returnObjects: true }) as string[]).map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>

        {/* 로그 */}
        <div className="mb-6 font-untitled">
          <div className="text-xl font-semibold web:text-2xl">
            <h3 className="text-primary-300">Latest</h3>
            <h3 className="text-primary-950">Log</h3>
          </div>
        </div>

        <MainPageLogCardList />
      </div>
    </>
  );
};

export default HomePage;
