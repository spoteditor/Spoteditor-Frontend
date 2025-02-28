import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useImages from '@/hooks/useImages';
import { Camera, ChevronRight, Circle, CircleCheck, Clock, MapPin } from 'lucide-react';
import { useRef, useState } from 'react';
import ImagePreviewItem from './ImagePreviewItem';

interface PlaceDetailFormItemProps {
  place: kakao.maps.services.PlacesSearchResultItem;
  idx: number;
}

const PlaceDetailFormItem = ({ place, idx }: PlaceDetailFormItemProps) => {
  const { handleFileChange, handleRemoveImage, imagePreviews } = useImages();
  const [isChecked, setIsChecked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChecked = () => setIsChecked((prev) => !prev);

  return (
    <div className="py-[5px]">
      {/* 장소 설명 */}
      <div className="flex flex-col gap-2">
        <div className="text-text-lg font-bold">
          <div className="flex justify-between">
            <p>{String(idx).padStart(2, '0')}</p>
            {isChecked ? (
              <CircleCheck className="fill-black stroke-white" onClick={handleChecked} />
            ) : (
              <Circle className="stroke-neutral-200" onClick={handleChecked} />
            )}
          </div>
          <p className="flex items-center">
            {place.place_name} <ChevronRight />
          </p>
        </div>

        <div className="flex flex-col text-primary-400">
          <div className="flex gap-2 items-center text-text-sm">
            <Clock size={16} />
            <p className="after:ml-1.5">{place.category_group_name}</p>
          </div>
          <div className="flex gap-2 items-center text-text-sm">
            <MapPin size={16} />
            <p className="after:ml-1.5 after:content-['|'] after:text-primary-100">
              {place.road_address_name.split(' ')[0]}
            </p>
            <p>{place.road_address_name}</p>
          </div>
        </div>
      </div>

      {/* 사진 첨부 */}
      <Button
        variant={'outline'}
        className="border w-full border-dashed gap-[5px] text-primary-600 px-2.5 py-3 mt-[15px] mb-2.5"
        onClick={() => fileInputRef.current?.click()}
      >
        <Camera />
        <span className="text-text-sm font-bold">
          사진첨부<span className="text-error-600"> * </span>(최대 3장)
        </span>
      </Button>

      {imagePreviews && (
        <div className="flex overflow-x-auto">
          {imagePreviews.map((previewURL, idx) => (
            <ImagePreviewItem
              key={previewURL}
              idx={idx}
              imagePreview={previewURL}
              onRemoveImage={handleRemoveImage}
            />
          ))}
        </div>
      )}
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
        multiple
      />

      {/* 내용 */}
      <Textarea
        className="bg-primary-50 min-h-[85px] px-[18px] py-2.5 text-primary-300 text-text-sm placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="내용을 입력해주세요. (최대 500자)"
        maxLength={500}
        // onClick={handleNavigateToWritePage}
        // readOnly
      />
    </div>
  );
};
export default PlaceDetailFormItem;
