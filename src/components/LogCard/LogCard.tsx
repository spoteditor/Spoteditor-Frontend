import useLogBookmarkMutation from '@/hooks/mutations/log/useLogBookmarkMutation';
import useLogBookMark from '@/hooks/queries/log/useLogBookMark';
import useResponsive from '@/hooks/useResponsive';
import { cn } from '@/lib/utils';
import { LogContent } from '@/services/apis/types/logAPI.type';
import { useLoginModalStore } from '@/store/loginStore';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { Bookmark } from 'lucide-react';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

type LogCardProps = {
  isLarge?: boolean; // latest의 3번째 이미지
  vertical?: boolean; // popularity 세로형 vs latest 가로형
  log?: LogContent;
};

const LogCard = memo(({ isLarge, vertical, log }: LogCardProps) => {
  const navi = useNavigate();
  const { data } = useLogBookMark(Number(log?.placeLogId));
  const isBookmarked = data?.isBookmarked;
  const { mutate: logBookmarkMutation } = useLogBookmarkMutation({
    isBookMark: data?.isBookmarked,
    placeLogId: Number(log?.placeLogId),
  });

  const { isMobile } = useResponsive();
  const { openLoginModal } = useLoginModalStore();

  const handleCardClick = () => navi(`/log/${log?.placeLogId}`);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!data) {
      openLoginModal();
      return;
    }

    logBookmarkMutation();
  };

  return (
    <div
      className={cn('h-full gap-1.5', isLarge ? 'flex flex-col' : 'grid grid-rows-[auto_1fr]')}
      onClick={handleCardClick}
    >
      {/* 이미지 - 그룹 */}
      <div className={cn('relative grow group cursor-pointer')}>
        <img
          src={getImgFromCloudFront(log?.image.storedFile ?? '')}
          alt="장소 이미지"
          className={cn(
            'object-cover w-full aspect-[3/2]',
            vertical && 'aspect-[3/4]',
            vertical && isMobile && 'max-w-xs mx-auto'
          )}
        />
        <div className="absolute inset-0 card-id-gradient" />
        <div className="absolute inset-0 transition-colors group-hover:bg-black/25" />
        <span className="flex items-center gap-1 p-2.5 text-white text-text-2xs font-semibold absolute bottom-0">
          {log?.author}
        </span>

        {/* 북마크 */}
        <div
          onClick={handleBookmarkClick}
          className="bg-white absolute top-4 right-4 p-[11px] opacity-0 group-hover:opacity-100 group/bookmark"
        >
          <Bookmark
            className={cn(
              'group-hover/bookmark:text-primary-400',
              isBookmarked && 'fill-black stroke-black'
            )}
            size={20}
          />
        </div>
      </div>

      {/* 설명 */}
      <div className="text-text-sm web:text-text-md">
        <h5 className="font-bold">{log?.name} </h5>
        <h6 className="font-normal text-primary-300">
          {log && `${log.address.sido} | ${log.address.sigungu}`}
        </h6>
      </div>
    </div>
  );
});

export default LogCard;
