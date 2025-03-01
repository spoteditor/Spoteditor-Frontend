import { useRegisterStore } from '@/store/registerStore';
import { CircleX } from 'lucide-react';

interface SelectedPlacePreviewProps {
  onRemove: (place: kakao.maps.services.PlacesSearchResultItem) => void;
}

const SelectedPlacePreview = ({ onRemove }: SelectedPlacePreviewProps) => {
  const selectedPlaces = useRegisterStore((state) => state.selectedPlaces);
  return (
    <div>
      <div className="px-4 py-[14px] bg-primary-50 text-text-sm font-medium flex gap-3 overflow-x-auto min-w-0 scrollbar-hide">
        {selectedPlaces.map((place, idx) => (
          <span className="flex items-center gap-[3px] cursor-pointer flex-shrink-0" key={idx}>
            {place.place_name}
            <CircleX
              className="p-1 fill-white stroke-primary-300"
              onClick={() => onRemove(place)}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default SelectedPlacePreview;
