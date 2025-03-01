import { Input } from '@/components/ui/input';
import { CircleX } from 'lucide-react';

interface ImagePreviewItemProps {
  idx: number;
  imagePreview: string;
  onRemoveImage: (index: number) => void;
}

const ImagePreviewItem = ({ idx, imagePreview, onRemoveImage }: ImagePreviewItemProps) => {
  return (
    <div className="relative m-1 shrink-0">
      <Input
        type="image"
        src={imagePreview}
        alt="커버 이미지"
        className="h-[300px] object-cover p-0 "
      />
      <CircleX
        className="stroke-primary-300 fill-slate-100 stroke-1 absolute top-2 right-2  cursor-pointer hover:fill-slate-50/50"
        onClick={() => onRemoveImage(idx)}
      />
    </div>
  );
};

export default ImagePreviewItem;
