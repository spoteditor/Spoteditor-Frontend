import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { REGISTER_SEARCH } from '@/constants/pathname';
import PlaceListItem from '@/features/registerpage/PlaceListItem';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  return (
    <div className="h-full flex flex-col py-5">
      <header className="border-b flex items-center">
        <ArrowLeft size={24} />
        <Input
          placeholder="장소를 검색해보세요."
          className="placeholder:text-primary-300 text-text-lg font-medium"
        />
        {/* 클릭시 카카오맵 연결 */}
        <Search />
      </header>

      <main className="flex flex-col items-center grow">
        {/* 최근 검색 */}
        <div className="w-full">
          <h3 className="text-text-2xl font-bold pt-5 pb-2.5">최근 검색한 장소</h3>
          {[...Array(2)].map((_, idx) => (
            <PlaceListItem key={idx} />
          ))}
        </div>

        {/* 최근 저장 */}
        <div className="w-full">
          <h3 className="text-text-2xl font-bold pt-5 pb-2.5">저장된 장소</h3>
          {[...Array(5)].map((_, idx) => (
            <PlaceListItem key={idx} />
          ))}

          <Button className="w-full" variant={'ghost'}>
            전체보기
          </Button>
        </div>
      </main>

      {/* 버튼 */}
      <div className="w-full flex flex-col items-center gap-[15px]">
        <Button className="w-full" asChild>
          <Link to={REGISTER_SEARCH}>완료</Link>
        </Button>
      </div>
    </div>
  );
};

export default SearchPage;
