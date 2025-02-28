import ArrowIcon from '@/components/Icons/ArrowIcon';
import MainPagination from '@/components/Pagination/MainPagination';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { REGISTER_SELECT } from '@/constants/pathname';
import LogCard from '@/features/homepage/LogCard';
import MainHero from '@/features/homepage/MainHero';
import useLogList from '@/hooks/queries/log/useLogList';

import { cn } from '@/lib/utils';
import { LogContent } from '@/services/apis/types/logAPI.type';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navi = useNavigate();
  const handleGotoRegisterPage = () => navi(REGISTER_SELECT);

  const { data, isLoading } = useLogList();

  if (isLoading) return;
  const { content } = data;
  return (
    <>
      {/* 메인 히어로 */}
      <MainHero />

      <div className="flex flex-col px-4 web:px-[50px]">
        {/* 제목 */}
        <div className="flex justify-between items-end mt-10 mb-6 font-untitled">
          <div className="text-xl web:text-2xl font-semibold">
            <h3 className="text-primary-300">Sort by</h3>
            <h3 className="text-primary-950">Popularity</h3>
          </div>
          <div className="hidden web:block">--------</div>
        </div>

        {/* 컨테이너 */}
        <Carousel>
          <CarouselContent className="flex">
            {content.map((log: LogContent) => (
              <CarouselItem className="flex-none basis-1/1.5 web:basis-1/4" key={log.placeLogId}>
                <LogCard vertical log={log} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* 에디터 설명 */}
        <div className="flex flex-col web:grid web:grid-cols-2 border-primary-100 my-20 web:gap-7 justify-center">
          <div className="py-[18px] border-t border-b flex flex-col justify-center web:py-10">
            <h3 className="text-md font-bold web:text-xl">
              모든 유저가 <br className="web:hidden" />
              특별한 "에디터"가 될 수 있어요!
            </h3>

            <div className="flex my-[15px]">
              <Button
                className="rounded-full text-text-sm text-white py-2.5 px-6 web:text-text-md web:py-3"
                onClick={handleGotoRegisterPage}
              >
                나의 추천 코스 등록하기
              </Button>
              <div className="rounded-full w-10 h-10 bg-black flex justify-center items-center">
                <ArrowIcon />
              </div>
            </div>
          </div>

          <p className="text-primary-300 text-text-sm web:border-t border-b border-primary-100 py-[18px] web:h-full flex items-center web:text-text-lg web:font-regular">
            내가 좋아하는 숨은 명소와 맛집을 공유하고, 다른 유저들이 여러분의 루트를 참고하며 "내가
            만든 코스로 누군가 즐거운 하루를 보냈구나!" 하는 느낌, 상상만 해도 행복하지 않나요? 🥰
            다른 유저들이 참고할 수 있도록 여러분만의 코스를 나눠보세요. 여러분이 만들어준 코스는
            많은 사람들에게 새로운 영감을 줄 거예요!
          </p>
        </div>

        {/* 로그 */}
        <div className="mb-6 font-untitled">
          <div className="text-xl web:text-2xl font-semibold">
            <h3 className="text-primary-300">Latest</h3>
            <h3 className="text-primary-950">Log</h3>
          </div>
        </div>

        <div className="flex flex-col gap-y-8 web:grid web:grid-cols-4 web:grid-rows-4 web:gap-x-[15px] web:gap-y-10">
          {content.map((log: LogContent, idx: number) => {
            const isLarge = idx === 2;

            return (
              <div key={idx} className={cn(isLarge && 'col-span-2 row-span-2')}>
                <LogCard log={log} />
              </div>
            );
          })}
        </div>
        <MainPagination />
      </div>
    </>
  );
};

export default HomePage;
