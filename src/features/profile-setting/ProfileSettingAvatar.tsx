import PenIcon from '@/components/Icons/PenIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useProfileStore } from '@/store/profileStore';
import { useEffect, useRef, useState } from 'react';

interface ProfileSettingAvatarProps {
  imageUrl: string;
}

export default function ProfileSettingAvatar({ imageUrl }: ProfileSettingAvatarProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => hiddenInputRef.current?.click();
  const { setFile } = useProfileStore();

  const initialImageUrl = imageUrl;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialImageUrl);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('file', file?.name);

    if (file) {
      setImageFile(file);
      setFile(file);
    } else {
      //이미지가 이미 있을 때 이미지를 새로 선택 안 할 경우 취소
      setImageFile(null); // 메모리 해제
      setImagePreview(initialImageUrl);
    }
  };

  //이미지 미리보기
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);

      // 미리보기가 있을 때만 클린업 함수로 메모리 해제
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [imageFile, initialImageUrl]);

  return (
    <div className="flex justify-center ">
      <article className="relative">
        <Avatar className="w-[100px] h-[100px] relative">
          <AvatarImage src={imagePreview} alt="프로필 이미지" />
        </Avatar>
        <button
          type="button"
          onClick={handleImageClick}
          className="absolute bottom-0 right-0 flex justify-center items-center w-[26px] h-[26px] bg-white z-10 rounded-full border border-[#E5E6E8]"
        >
          <PenIcon className="w-4 h-4 stroke-black" />
        </button>
        <input
          type="file"
          accept="image/*"
          id="imageUrl"
          ref={hiddenInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </article>
    </div>
  );
}
