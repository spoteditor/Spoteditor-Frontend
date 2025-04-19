import ImageDialog from '@/components/Dialog/ImageDialog';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import usePlaceBookMarkMutation from '@/hooks/mutations/log/usePlaceBookMarkMutation';
import useResponsive from '@/hooks/useResponsive';
import { cn } from '@/lib/utils';
import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import { Image } from '@/services/apis/types/registerAPI.type';
import { useLoginModalStore } from '@/store/loginStore';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { Bookmark, Clock, MapPin } from 'lucide-react';
import { useParams } from 'react-router-dom';

interface PlaceItemProps {
  place: PlaceInLog;
  idx: number;
  isBookMark: boolean | undefined;
}

const PlaceItem = ({ place, idx, isBookMark }: PlaceItemProps) => {
  const { placeLogId } = useParams();
  const { name, description, address, images, placeId } = place;
  const { isMobile } = useResponsive();
  const { mutate: placeBookmarkMutation } = usePlaceBookMarkMutation({
    isBookMark: Boolean(isBookMark),
    placeId,
    placeLogId: Number(placeLogId),
  });
  const { openLoginModal } = useLoginModalStore();
  const onClickPlaceBookMark = () => {
    if (isBookMark === undefined) {
      openLoginModal();
      return;
    }
    placeBookmarkMutation();
  };

  return (
    <div className="border-t border-primary-100 pt-[15px] pb-10 web:grid web:grid-cols-[1fr_3fr] web:gap-[15px] web:py-5">
      {/* 장소 제목 */}
      <div className="space-y-2">
        <div className="flex justify-between text-text-lg font-bold web:text-text-2xl">
          <div>
            <p>{String(idx).padStart(2, '0')}</p>
            <h4>{name}</h4>
          </div>
          <Bookmark
            className={cn('cursor-pointer web:!size-9', isBookMark && 'fill-black')}
            onClick={onClickPlaceBookMark}
          />
        </div>

        <div className="flex flex-col text-text-sm text-primary-400 web:text-text-lg">
          <div className="flex gap-2 items-center">
            <Clock className="w-[1em] h-[1em]" />
            <p>카페</p>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin className="w-[1em] h-[1em]" />
            <p className="after:ml-1.5 after:content-['|'] after:text-primary-100">
              {address.sido}
            </p>
            <p>
              {address.bname} {address.sigungu}
            </p>
          </div>
        </div>
      </div>

      {/* 이미지 컨테이너 */}
      <div className="grow">
        <Carousel className="my-[15px] web:my-0" opts={{ active: isMobile }}>
          <CarouselContent>
            {images.map((img: Image) => (
              <CarouselItem className="flex-none" key={img.imageId}>
                <ImageDialog
                  images={images}
                  triggerImg={getImgFromCloudFront(img.storedFile)}
                  triggerAlt={img.originalFile}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* 장소 설명 */}
        <p className="text-primary-400 text-text-sm web:text-text-lg web:my-5">{description}</p>
      </div>
    </div>
  );
};

export default PlaceItem;
