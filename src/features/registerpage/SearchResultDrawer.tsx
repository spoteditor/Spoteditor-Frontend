import { Button } from '@/components/ui/button';
import { DrawerPortal, DrawerTitle } from '@/components/ui/drawer';
import { useRegisterStore } from '@/store/registerStore';
import { Dispatch, SetStateAction, useState } from 'react';
import { Drawer } from 'vaul';

const snapPoints = ['500px', 1];

interface SearchResultDrawerProps {
  places: kakao.maps.services.PlacesSearchResult;
  onPlaceClick: (place: kakao.maps.services.PlacesSearchResultItem) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchResultDrawer({
  places,
  onPlaceClick,
  isOpen,
  setIsOpen,
}: SearchResultDrawerProps) {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const addSelectedPlace = useRegisterStore((state) => state.addSelectedPlace);
  const handlePlaceSelect = (place: kakao.maps.services.PlacesSearchResultItem) => {
    addSelectedPlace(place);
    setIsOpen(false);
  };
  return (
    <Drawer.Root
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      snapToSequentialPoint
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DrawerPortal>
        <Drawer.Content
          data-testid="content"
          className="z-50 fixed flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px]"
        >
          <div className="mx-auto mt-4 mb-6 h-2 w-[100px] rounded-full bg-primary-100 dark:bg-neutral-800" />
          <DrawerTitle className="hidden">검색 장소 리스트</DrawerTitle>
          <div className="overflow-y-auto scrollbar-hide">
            <ul className="cursor-pointer">
              {places.map((place, index) => (
                <li
                  key={index}
                  className="py-2.5 px-4 flex justify-between items-center hover:bg-primary-50"
                  onClick={() => onPlaceClick(place)}
                >
                  <div>
                    <div className="flex items-center gap-[3px] font-medium mb-[3px]">
                      <h4 className="text-text-sm">{place.place_name}</h4>
                      <span className="text-text-xs text-primary-400">{place.category_name}</span>
                    </div>
                    <div className="flex font-medium text-text-xs items-center gap-1.5">
                      <h5 className="text-primary-300">도로명</h5>
                      <p className="text-primary-400">{place.road_address_name}</p>
                    </div>
                    <div className="flex font-medium text-text-xs items-center gap-1.5">
                      <h5 className="text-primary-300">지번</h5>
                      <p className="text-primary-400">{place.address_name}</p>
                    </div>
                  </div>
                  <Button
                    variant={'outline'}
                    size={'s'}
                    fullRounded
                    onClick={() => handlePlaceSelect(place)}
                    className="hover:bg-black hover:text-white"
                  >
                    선택
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </Drawer.Content>
      </DrawerPortal>
    </Drawer.Root>
  );
}
