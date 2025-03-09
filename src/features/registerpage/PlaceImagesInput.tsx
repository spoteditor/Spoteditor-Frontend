import { CameraIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRef } from 'react';
import ImagePreviewItem from './ImagePreviewItem';
interface PlaceImagesInputProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleRemoveImage: (index: number) => void;
  imagePreviews: string[];
}

const PlaceImagesInput = ({
  handleFileChange,
  handleRemoveImage,
  imagePreviews,
}: PlaceImagesInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button
        variant={'outline'}
        className="border w-full border-dashed gap-[5px] text-primary-600 px-2.5 py-3 mt-[15px] mb-2.5"
        onClick={() => fileInputRef.current?.click()}
      >
        <CameraIcon className="stroke-primary-600" />
        <span className="text-text-sm font-bold">
          사진첨부<span className="text-error-600"> * </span>(최대 3장)
        </span>
      </Button>

      {imagePreviews && (
        <div className="flex overflow-x-auto mb-2.5">
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
    </>
  );
};

export default PlaceImagesInput;
