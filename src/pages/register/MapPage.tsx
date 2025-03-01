import { Button } from '@/components/ui/button';
import { REGISTER_DETAILS, REGISTER_SEARCH } from '@/constants/pathname';
import RegisterSearchBar from '@/features/registerpage/RegisterSearchBar';
import SearchResultDrawer from '@/features/registerpage/SearchResultDrawer';
import SelectedPlacePreview from '@/features/registerpage/SelectedPlacePreview';
import { cn } from '@/lib/utils';
import { useRegisterStore } from '@/store/registerStore';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MapPage = () => {
  const navi = useNavigate();
  // 전역 상태
  const selectedPlaces = useRegisterStore((state) => state.selectedPlaces);
  const removeSelectedPlace = useRegisterStore((state) => state.removeSelectedPlace);

  // 지도 관련 객체들
  const isSDKLoadedRef = useRef(false);
  const isMapLoadedRef = useRef(false);
  const mapContainerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const placeRef = useRef<kakao.maps.services.Places | null>(null);
  const geoCoderRef = useRef<kakao.maps.services.Geocoder | null>(null);
  const currentLocationRef = useRef<{ lat: number; lon: number } | null>(null);

  // 리렌더링 사용 상태
  // const [address, setAddress] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [markers, setMarkers] = useState<kakao.maps.Marker[] | null>([]); // 검색 결과 마커들
  const [places, setPlaces] = useState<kakao.maps.services.PlacesSearchResult>([]); // 검색 결과 장소들

  // sdk 로드
  useEffect(() => {
    if (isSDKLoadedRef.current) return;

    loadKakaoMapSDK(() => {
      isSDKLoadedRef.current = true;

      // 지도 로드 되면 초기화
      window.kakao.maps.load(() => {
        isMapLoadedRef.current = true;
        initMap();
      });
    });
  }, []);

  const initMap = async () => {
    if (!isSDKLoadedRef.current || !isMapLoadedRef.current) return;

    try {
      if (currentLocationRef.current) {
        console.log('기존 위치 재사용');
        return;
      }

      const { lat, lon } = await getCurrentLocation(); // 현재 위치 가져오기
      currentLocationRef.current = { lat, lon };

      const options = {
        center: new window.kakao.maps.LatLng(lat, lon), // 직접 lat, lon 사용
        level: 3,
      };

      mapRef.current = new window.kakao.maps.Map(mapContainerRef.current, options);
      placeRef.current = new window.kakao.maps.services.Places();
      geoCoderRef.current = new window.kakao.maps.services.Geocoder();
    } catch (error) {
      console.log('위치 정보 가져오기 실패');
    }
  };

  // 검색어 입력
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current || !placeRef.current || !mapRef.current) return;

    removeMarker(); // 기존 검색어 마크 지우기

    const query = inputRef.current.value;
    placeRef.current.keywordSearch(query, searchByKeyword, {
      location: new window.kakao.maps.LatLng(
        currentLocationRef.current?.lat,
        currentLocationRef.current?.lon
      ),
      radius: 2000,
    });
  };

  // pagination 가능
  const searchByKeyword = (result: kakao.maps.services.PlacesSearchResult, status: string) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setPlaces(result);
      displayPlaces(result);
      setIsOpen(true);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 없습니다.');
      setPlaces([]);
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('검색 중 오류가 발생했습니다.');
      setPlaces([]);
    }
  };

  const displayPlaces = (result: kakao.maps.services.PlacesSearchResult) => {
    const bounds = new window.kakao.maps.LatLngBounds(); // 경계 객체

    const newMarkers = result.map((place) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      bounds.extend(placePosition);
      return addMarker(placePosition);
    });

    mapRef.current?.setBounds(bounds);
    setMarkers(newMarkers);
  };

  const addMarker = (position: kakao.maps.LatLng) => {
    const marker = new window.kakao.maps.Marker({ position });
    marker.setMap(mapRef.current);

    // 클릭 시 중앙 정렬
    window.kakao.maps.event.addListener(marker, 'click', () => {
      mapRef.current?.setCenter(position);
    });

    return marker;
  };

  const removeMarker = () => {
    markers?.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  // 장소 클릭 시, 지도 중심을 클릭한 장소로 이동
  const handlePlaceClick = (place: kakao.maps.services.PlacesSearchResultItem) => {
    if (!mapRef.current || !placeRef.current) return;
    const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
    mapRef.current.setCenter(placePosition);
  };

  return (
    <div className="h-full flex flex-col">
      <RegisterSearchBar ref={inputRef} onSubmit={handleSubmit} to={REGISTER_SEARCH} />
      {selectedPlaces.length > 0 && <SelectedPlacePreview onRemove={removeSelectedPlace} />}

      {/* 지도 담을 영역 */}
      <div ref={mapContainerRef} className="w-full h-full relative">
        <Button
          variant={'outline'}
          fullRounded
          className={cn(
            'absolute bottom-[15px] left-1/2 transform -translate-x-1/2 z-20 !text-text-sm invisible',
            places.length && 'visible'
          )}
          onClick={() => setIsOpen(true)}
        >
          목록 보기
        </Button>
      </div>

      {/* 장소 리스트 */}
      {!!places.length && (
        <SearchResultDrawer
          places={places}
          onPlaceClick={handlePlaceClick}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

      <div className="pt-2 pb-6 px-4">
        <Button
          className="w-full"
          size={'xl'}
          onClick={() => navi(REGISTER_DETAILS)}
          disabled={!selectedPlaces.length}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

// sdk
function loadKakaoMapSDK(loadedCallback: () => void) {
  const script = document.createElement('script');
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
    import.meta.env.VITE_KAKAO_MAP_KEY
  }&autoload=false&libraries=services,clusterer`;
  script.async = true;
  script.onload = loadedCallback;
  document.head.appendChild(script);
}

// geolocation
async function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export default MapPage;
