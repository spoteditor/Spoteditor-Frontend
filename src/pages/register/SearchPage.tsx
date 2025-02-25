import { Button } from '@/components/ui/button';
import { REGISTER_DETAILS, REGISTER_SELECT } from '@/constants/pathname';
import PlaceListItem from '@/features/registerpage/PlaceListItem';
import RegisterSearchBar from '@/features/registerpage/RegisterSearchBar';
import { useRegisterStore } from '@/store/registerStore';
import { CircleX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { KakaoPlace } from './types/place.type';

const SearchPage = () => {
  const navi = useNavigate();
  const selectedPlaces = useRegisterStore((state) => state.selectedPlaces);
  const recentSearchPlaces = useRegisterStore((state) => state.recentSearchPlaces);
  const removeSelectedPlace = useRegisterStore((state) => state.removeSelectedPlace);

  const handleRemoveClick = (place: KakaoPlace) => removeSelectedPlace(place);
  return (
    <div className="h-full flex flex-col">
      <RegisterSearchBar to={REGISTER_SELECT} />

      {selectedPlaces.length > 0 && (
        <div className="px-4 py-[14px] bg-primary-50 text-text-sm font-medium flex gap-3">
          {selectedPlaces.map((place, idx) => (
            <span className="flex items-center gap-[3px] cursor-pointer" key={idx}>
              {place.place_name}
              <CircleX className="p-1" onClick={() => handleRemoveClick(place)} />
            </span>
          ))}
        </div>
      )}

      <main className="flex flex-col items-center grow gap-[3px] px-4">
        {/* 최근 검색 */}
        <div className="w-full">
          <h3 className="text-text-2xl font-bold pt-5 pb-2.5">최근 검색한 장소</h3>
          {recentSearchPlaces?.map((place, idx) => (
            <PlaceListItem key={idx} place={place} />
          ))}
        </div>

        {/* 5개부터 활성화 */}
        {recentSearchPlaces.length > 4 && (
          <Button className="w-full" variant={'ghost'}>
            전체보기
          </Button>
        )}
      </main>

      {/* 버튼 */}
      <div className="pt-2 pb-6 px-4">
        <Button
          className="w-full"
          size={'xl'}
          disabled={!selectedPlaces.length}
          onClick={() => navi(REGISTER_DETAILS)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default SearchPage;
