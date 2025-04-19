import usePlaceBookMarkMutation from '@/hooks/mutations/log/usePlaceBookMarkMutation';
import useResponsive from '@/hooks/useResponsive';
import { cn } from '@/lib/utils';
import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import { useLoginModalStore } from '@/store/loginStore';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { Bookmark } from 'lucide-react';
import React, { memo } from 'react';
type ModalLogCard = {
  place?: PlaceInLog;
  isPlaceBookMark?: boolean | undefined;
  placeLogId: number;
};

const ModalLogCard = memo(({ place, isPlaceBookMark, placeLogId }: ModalLogCard) => {
  const { mutate: placeBookmarkMutation } = usePlaceBookMarkMutation({
    isBookMark: isPlaceBookMark as boolean,
    placeId: Number(place?.placeId),
    placeLogId,
  });

  const { isMobile } = useResponsive();
  const { openLoginModal } = useLoginModalStore();
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaceBookMark === undefined) {
      openLoginModal();
      return;
    }
    placeBookmarkMutation();
  };

  return (
    <div className="h-full">
      {/* 이미지 */}
      <div className={cn('relative grow group cursor-pointer')}>
        <img
          src={getImgFromCloudFront(place?.images[0].storedFile ?? '')}
          alt="장소 이미지"
          className={cn('object-cover w-full aspect-[3/4]', isMobile && 'max-w-xs mx-auto')}
        />
        <div className="absolute inset-0 card-id-gradient"></div>
        <div className="absolute inset-0 group-hover:bg-black/25 transition-colors"></div>

        <div
          onClick={handleBookmarkClick}
          className={cn('bg-white absolute top-1 right-1 4 p-[11px] opacity-100 group/bookmark')}
        >
          <Bookmark
            className={cn(
              'group-hover/bookmark:text-primary-400',
              isPlaceBookMark && 'fill-black stroke-black'
            )}
            size={20}
          />
        </div>
      </div>
      {/* 설명 */}
      <div className="text-text-sm mt-[5px]">
        <h5 className="font-bold">{place?.name} </h5>
        <h6 className="text-light-300 font-normal">
          {place && `${place.address.sido} | ${place.address.sigungu}`}
        </h6>
      </div>
    </div>
  );
});

export default ModalLogCard;
