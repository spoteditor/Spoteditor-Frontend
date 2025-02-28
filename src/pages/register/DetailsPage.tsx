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
import { MAPS, REGISTER_SEARCH } from '@/constants/pathname';
import PlaceDetailFormItem from '@/features/registerpage/PlaceDetailFormItem';
import useImagePreview from '@/hooks/useImagePreview';
import { cn } from '@/lib/utils';
import api from '@/services/apis/api';
import { Address, Log, Place, PresignedUrlWithName } from '@/services/apis/types/registerAPI.type';
import { useRegisterStore } from '@/store/registerStore';
import { ArrowLeft, Camera, CircleX } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 스크롤 수정 필요
const DetailsPage = () => {
  const navi = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { imagePreview, handleFileChange, handleClearImage, presignedUrlObj } = useImagePreview();
  const selectedPlaces = useRegisterStore((state) => state.selectedPlaces);

  const coverUploadInputRef = useRef<HTMLInputElement>(null);
  const logTitleInputRef = useRef<HTMLInputElement>(null);
  const logDescripTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const textRefs = useRef<{ [placeId: string]: string }>({});

  // 로그 등록 시 필요한 {presignedUrl, uuid}
  const [presignedUrlList, setPresignUrlList] = useState<{ [key: string]: PresignedUrlWithName[] }>(
    {}
  );

  const handleClearTitle = () => {
    if (logTitleInputRef.current) {
      logTitleInputRef.current.value = '';
      logTitleInputRef.current.focus();
    }
  };
  const setRef = (id: string, elem: HTMLTextAreaElement) => {
    if (elem) textRefs.current[id] = elem.value;
    else delete textRefs.current[id];
  };

  // 제출 형식에 맞춰 포맷
  const formatAddress = (place: kakao.maps.services.PlacesSearchResultItem): Address => ({
    address: place.address_name,
    roadAddress: place.road_address_name,
    latitude: Number(place.y),
    longitude: Number(place.x),
    sido: place.address_name.split(' ')[0],
    bname: place.address_name.split(' ')[1],
    sigungu: place.address_name.split(' ')[2],
  });

  const formatPlace = (place: kakao.maps.services.PlacesSearchResultItem): Place => ({
    name: place.place_name,
    description: textRefs.current[place.id],
    address: formatAddress(place),
    category: 'TOUR',
    originalFiles: presignedUrlList[place.place_name].map((item) => item.originalFile),
    uuids: presignedUrlList[place.place_name].map((item) => item.uuid),
  });

  const formatLog = (places: kakao.maps.services.PlacesSearchResult): Log => {
    if (
      !logTitleInputRef.current?.value ||
      !logDescripTextAreaRef.current?.value ||
      !presignedUrlObj?.originalFile
    ) {
      alert('로그 제목 / 설명 / 커버 이미지를 작성해주세요');
      return;
    }

    return {
      name: logTitleInputRef.current?.value,
      description: logDescripTextAreaRef.current?.value,
      originalFile: presignedUrlObj?.originalFile,
      uuid: presignedUrlObj?.uuid,
      status: 'public',
      tags: [],
      places: places.map((place) => ({
        ...formatPlace(place),
      })),
    };
  };

  const handlePostLog = async () => {
    const formatedLog = formatLog(selectedPlaces);
    const result = await api.register.createLog(formatedLog);
    console.log(result);
  };

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <header className="flex items-center py-3 justify-between">
        <div className="flex gap-2.5">
          <ArrowLeft size={24} onClick={() => navi(MAPS)} className="cursor-pointer" />
          <h3 className="text-text-2xl font-bold">서울 · 종로구</h3>
        </div>
        <Button
          variant={'transparent'}
          className="text-primary-300 !text-text-md"
          onClick={() => navi(REGISTER_SEARCH)}
        >
          장소 추가
        </Button>
      </header>

      <main className="flex flex-col items-center grow gap-3 min-h-0 overflow-y-auto scrollbar-hide">
        {/* 로그 타이틀 */}
        <div className="flex items-center w-full border-b">
          <Input
            name="logTitle"
            placeholder="제목을 입력해주세요. (최대 30자) *"
            className=" placeholder:text-primary-300 placeholder:after:content-['*'] font-medium"
            ref={logTitleInputRef}
            maxLength={30}
            defaultValue=""
          />
          <CircleX className=" fill-primary-100 stroke-white" onClick={handleClearTitle} />
        </div>
        {/* 커버 이미지 */}
        {imagePreview && (
          <div className="relative">
            <Input
              id="coverImg"
              type="image"
              src={imagePreview}
              alt="커버 이미지"
              className="w-full aspect-[2/1] p-0 object-cover"
            />
            <CircleX
              className="stroke-primary-100 absolute top-4 right-4 cursor-pointer hover:fill-slate-50/50"
              onClick={handleClearImage}
            />
          </div>
        )}

        <div className="px-4 w-full web:px-0">
          {/* 파일 입력 */}
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={coverUploadInputRef}
            className="hidden"
          />
          {/* 커버 이미지 버튼 */}
          <Button
            variant={'outline'}
            className={cn(
              'border w-full border-dashed gap-[5px] text-primary-600 px-2.5 py-3 mb-2.5',
              imagePreview && 'hidden'
            )}
            onClick={() => coverUploadInputRef.current?.click()}
          >
            <Camera />
            <span className="text-text-sm font-bold">
              커버이미지<span className="text-error-600 m-1">*</span>
            </span>
          </Button>
          {/* 로그 설명 */}
          <Textarea
            className="bg-primary-50 min-h-[85px] px-[18px] py-2.5 text-primary-300 text-text-sm  placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="내용을 입력해주세요. (최대 500자)"
            maxLength={500}
            ref={logDescripTextAreaRef}
            // onClick={handleNavigateToWritePage}
            // readOnly
          />
          <div className="flex flex-col w-full">
            {selectedPlaces.map((place, idx) => (
              <PlaceDetailFormItem
                place={place}
                key={place.id}
                idx={idx + 1}
                setRef={setRef}
                onChangePresignUrlList={setPresignUrlList}
              />
            ))}
          </div>
        </div>
      </main>

      {/* 버튼 */}
      <div className="pt-2 pb-3 px-4">
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button className="w-full" size={'xl'}>
              선택
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <span className="text-info-500">{logTitleInputRef.current?.value}</span> 로그를
                등록하시겠어요?
              </AlertDialogTitle>
              <AlertDialogDescription>
                <Label htmlFor="secret" className="flex items-center gap-3">
                  <Input type="checkbox" id="secret" className="w-fit" />
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

export default DetailsPage;
