import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import CoverImageInput from '@/features/registerpage/CoverImageInput';
import LogWriteBar from '@/features/registerpage/LogWriteBar';
import PlaceDetailFormItem from '@/features/registerpage/PlaceDetailFormItem';
import useImagePreview from '@/hooks/useImagePreview';
import api from '@/services/apis/api';
import { Log, Place, PresignedUrlWithName } from '@/services/apis/types/registerAPI.type';
import { useRegisterStore } from '@/store/registerStore';
import { formatAddress } from '@/utils/formatLogForm';
import { CircleX } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogWritePage = () => {
  const navi = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [logTitle, setLogTitle] = useState('');
  const selectedPlaces = useRegisterStore((state) => state.selectedPlaces);
  const resetSelectedPlaces = useRegisterStore((state) => state.resetSelectedPlaces);
  const { imagePreview, handleFileChange, handleClearImage, presignedUrlObj } = useImagePreview();
  const logDescripTextAreaRef = useRef<HTMLTextAreaElement>(null);

  // 로그 등록 시 필요한 {presignedUrl, uuid}
  const [presignedUrlList, setPresignUrlList] = useState<{ [key: string]: PresignedUrlWithName[] }>(
    {}
  );

  const handleClearTitle = () => setLogTitle('');

  const textRefs = useRef<{ [placeId: string]: string }>({});
  const registerTextRef = (id: string, elem: HTMLTextAreaElement) => {
    if (elem) textRefs.current[id] = elem.value;
    else delete textRefs.current[id];
  };

  const [sido, , bname] = selectedPlaces[0].address_name.split(' '); // 뒤로가기 옆 로그 대표 지역 이름
  // 제출 형식에 맞춰 포맷

  const formatPlace = (place: kakao.maps.services.PlacesSearchResultItem): Place | null => {
    const placeImages = presignedUrlList[place.place_name];
    if (!placeImages || placeImages.length === 0) {
      alert(`${place.place_name} 이미지가 비어있습니다.`);
      return null;
    }

    return {
      name: place.place_name,
      description: textRefs.current[place.id],
      address: formatAddress(place),
      category: 'TOUR',
      originalFiles: presignedUrlList[place.place_name].map((item) => item.originalFile),
      uuids: presignedUrlList[place.place_name].map((item) => item.uuid),
    };
  };

  const formatLog = (places: kakao.maps.services.PlacesSearchResult): Log | null => {
    if (!logTitle || !logDescripTextAreaRef.current?.value || !presignedUrlObj?.originalFile) {
      alert('로그 제목 / 설명 / 커버 이미지를 작성해주세요');
      return null;
    }

    const formattedPlaces = places.map((place) => formatPlace(place));

    if (formattedPlaces.some((place) => place === null)) return null;

    // 로그 정보
    return {
      name: logTitle,
      description: logDescripTextAreaRef.current.value,
      originalFile: presignedUrlObj?.originalFile,
      uuid: presignedUrlObj?.uuid,
      status: 'public',
      tags: [],
      places: formattedPlaces as Place[],
    };
  };

  const handlePostLog = async () => {
    const formatedLog = formatLog(selectedPlaces);
    if (!formatedLog) return;

    const result = await api.register.createLog(formatedLog);
    if (result) {
      resetSelectedPlaces();
      navi(`/log/${result.placeLogId}`, { replace: true });
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <LogWriteBar sido={sido} bname={bname} />

      <main className="flex flex-col items-center grow min-h-0 overflow-y-auto scrollbar-hide">
        {/* 로그 제목 */}
        <section className="flex items-center w-full border-b px-4 relative">
          <Input
            name="logTitle"
            placeholder="제목을 입력해주세요. (최대 30자) *"
            className=" placeholder:text-primary-300 placeholder:after:content-['*'] font-medium px-0"
            maxLength={30}
            value={logTitle}
            onChange={(e) => setLogTitle(e.target.value)}
          />
          {logTitle && (
            <CircleX
              className="stroke-white fill-primary-100 absolute stroke-1 top-2 right-4  cursor-pointer hover:fill-slate-50/50"
              size={24}
              onClick={handleClearTitle}
            />
          )}
        </section>

        {/* 커버 이미지 */}
        <CoverImageInput
          imagePreview={imagePreview}
          handleFileChange={handleFileChange}
          handleClearImage={handleClearImage}
        />

        <div className="px-4 w-full">
          {/* 로그 설명 */}
          <Textarea
            className="bg-primary-50 min-h-[85px] px-[18px] py-2.5 text-primary-300 text-text-sm  placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="내용을 입력해주세요. (최대 500자)"
            maxLength={500}
            ref={logDescripTextAreaRef}
          />

          {/* 장소 */}
          <div className="flex flex-col w-full mt-3">
            {selectedPlaces.map((place, idx) => (
              <PlaceDetailFormItem
                place={place}
                key={place.id}
                idx={idx + 1}
                registerTextRef={registerTextRef}
                onChangePresignUrlList={setPresignUrlList}
              />
            ))}
          </div>
        </div>
      </main>

      {/* 버튼 */}
      <div className="pt-2 pb-3 px-4 ">
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button className="w-full" size={'xl'}>
              선택
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-[400px] min-w-[300px]">
            <AlertDialogHeader>
              <AlertDialogTitle>
                <span className="text-info-500">{logTitle}</span> 로그를 등록하시겠어요?
              </AlertDialogTitle>
              <AlertDialogDescription>
                <Label htmlFor="secret" className="flex items-center gap-3 h-fit">
                  <Input
                    type="checkbox"
                    id="secret"
                    className="w-5 h-5 border rounded-sm !border-red-400 bg-white cursor-pointer  checked:text-white checked:accent-black"
                  />
                  <span className="text-black text-text-sm">비공개</span>
                </Label>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={handlePostLog}>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default LogWritePage;
