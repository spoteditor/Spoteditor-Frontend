import { cn } from '@/lib/utils';
import { useState } from 'react';
import CitySearchForm from './CitySearchForm';
import CourseButton from './CourseButton';

const categories: string[] = [
  '로.맨.틱 데이트 코스!',
  '가성비 굿 하루',
  '액티비티한 하루!',
  '감성충전 미술관 데이트',
  '홀로 독서하는 하루',
  '찐하게 소비한 하루',
  '친구랑 다양하고 알차게 보낸 하루',
];
const MainHero = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-black px-4 py-[30px] gap-9 flex flex-col web:grid web:grid-cols-2 web:gap-[30px] web:px-[50px] web:py-10 relative">
      <div className="flex flex-col justify-between web:justify-center">
        <div className="text-white text-md font-medium web:text-xl pb-[25px]">
          반가워요! <br />
          Spoteditor는 "어디 가서 놀지?"
          <br className="web:hidden" />
          하고 고민하는
          <br className="hidden web:block" />
          여러분을 위해
          <br className="web:hidden" />
          만들어졌어요.
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
          'flex flex-col transition-all duration-300 web:px-5 web:py-0.5 gap-5',
          isOpen ? 'max-h-[345px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <p className="text-primary-500 text-text-sm web:text-text-xl">
          사실 어디 놀러 갈지 정하는 게 의외로 스트레스잖아요? 맛집도 찾고, 사진 찍기 좋은 곳도
          골라야 하고, 이동 동선도 생각해야 하고... 아, 머리 아파! Spoteditor에선 그런 고민 필요
          없어요. 하루를 알차게 보낼 수 있는 데이트 코스나 친구랑 돌아다니기 좋은 루트를 쉽게 찾아볼
          수 있게 도와드릴게요. 그냥 간단히 어떤 분위기의 하루를 보내고 싶은지, 누구랑 함께 하는지,
          어떤 지역에서 놀고 싶은지만 알려주세요. 저희가 딱 맞는 루트를 추천해 드릴게요.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <CourseButton key={category} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainHero;
