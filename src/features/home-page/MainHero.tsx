import useResponsive from '@/hooks/useResponsive';
import { cn } from '@/lib/utils';
import { useCitySearchStore } from '@/store/searchStore';
import { useState } from 'react';
import CitySearchForm from '../search/CitySearchForm/CitySearchForm';
import CourseButton from './CourseButton';
import { useTranslation } from 'react-i18next';

const MainHero = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { isDropBox } = useCitySearchStore();
  const { isWeb } = useResponsive();
  const { t } = useTranslation();
  const descList = t('home.desc', { returnObjects: true }) as string[];
  const categoryList = t('home.categories', { returnObjects: true }) as string[];
  return (
    <>
      <div className="web:z-20 bg-black px-4 py-[30px] gap-9 flex flex-col web:grid web:grid-cols-2 web:gap-[30px] web:px-[50px] web:py-10 relative">
        <div className="flex flex-col justify-between web:justify-center">
          <div className="text-white text-md font-medium web:text-xl pb-[25px]">
            {t('home.intro.line1')} <br />
            {t('home.intro.line2')}
            <br className="web:hidden" />
            {t('home.intro.line3')}
            <br className="hidden web:block" />
            {t('home.intro.line4')}
            <br className="web:hidden" />
            {t('home.intro.line5')}
          </div>
          <CitySearchForm />
        </div>

        {/* 접히는 부분 */}
        {/* 위쪽 */}
        <div
          className={`w-4 h-4 transition-all duration-300 absolute bottom-0 right-0 cursor-pointer [clip-path:polygon(0%_0%,100%_0%,0%_100%)] web:hidden
          ${isOpen ? 'bg-primary-500' : 'bg-black'}`}
          onClick={() => setIsOpen(!isOpen)}
        ></div>
        {/* 아래쪽 */}
        <div
          className={`w-4 h-4 transition-all duration-300 absolute bottom-0 right-0 cursor-pointer [clip-path:polygon(100%_0%,0%_100%,100%_100%)] web:hidden
          ${isOpen ? 'bg-white' : 'bg-primary-500'}`}
          onClick={() => setIsOpen(!isOpen)}
        ></div>

        {/* 접히는 설명 */}

        <div
          className={cn(
            'flex flex-col transition-all duration-300 web:px-5 web:py-0.5 gap-5 justify-between',
            isOpen ? 'max-h-[345px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="flex flex-col justify-center text-primary-500 text-text-sm web:text-text-xl grow">
            {descList.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categoryList.map((category, index) => (
              <CourseButton key={index} category={category} />
            ))}
          </div>
        </div>
      </div>
      {isWeb && isDropBox && (
        <div className="fill-black/50 backdrop-blur-[10px] w-screen h-screen fixed top-0 left-0 z-10" />
      )}
    </>
  );
};

export default MainHero;
