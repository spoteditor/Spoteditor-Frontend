import mockImg1 from '@/assets/mock/1.png';
import mockImg3 from '@/assets/mock/3.png';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import MainPagination from '@/components/Pagination/MainPagination';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import LogCard from '@/features/homepage/LogCard';
import MainHero from '@/features/homepage/MainHero';

import { cn } from '@/lib/utils';

const HomePage = () => {
  return (
    <div>
      {/* 메인 히어로 */}
      <MainHero />

      <div className="flex flex-col px-4 web:px-[50px]">
        {/* 제목 */}
        <div className="flex justify-between items-end mt-10 mb-6">
          <div>
            <h3 className="text-primary-300 text-xl font-semibold">Sort by</h3>
            <h3 className="text-primary-950 text-xl font-semibold">Popularity</h3>
          </div>
          <div className="hidden web:block">--------</div>
        </div>

        {/* 컨테이너 */}
        <Carousel>
          <CarouselContent className="flex">
            {[...Array(5)].map((_, idx) => (
              <CarouselItem className="flex-none basis-1/1.5 web:basis-1/4" key={idx}>
                <LogCard
                  title={'혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페'}
                  image={mockImg1}
                  location1="서울"
                  location2="위치 세부정보"
                  vertical
                />
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
              <Button className="rounded-full text-text-sm text-white py-2.5 px-6 web:text-text-md web:py-3">
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
        <div>
          <h3 className="text-primary-300 text-xl font-semibold">Latest</h3>
          <h3 className="text-primary-950 text-xl font-semibold">Log</h3>
        </div>

        <div className="flex flex-col gap-y-8 web:grid web:grid-cols-4 web:grid-rows-4 web:gap-x-[15px] web:gap-y-10">
          {[...Array(13)].map((_, idx) => {
            const isLarge = idx === 2;

            const logCardProps = {
              key: idx,
              title: '혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페',
              image: isLarge ? mockImg1 : mockImg3,
              location1: '서울',
              location2: '위치 세부정보',
              isLarge,
            };

            return (
              <div key={idx} className={cn(isLarge && 'col-span-2 row-span-2')}>
                <LogCard {...logCardProps} />
              </div>
            );
          })}
        </div>

        <MainPagination />
      </div>
    </div>
  );
};

export default HomePage;
