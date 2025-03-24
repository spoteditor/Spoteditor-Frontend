import XIcon from '@/components/Icons/XIcon';
import Loading from '@/components/Loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useFollower from '@/hooks/queries/follow/useFollower';
import useOtherFollower from '@/hooks/queries/follow/useOtherFollower';
import useBottomScrollTrigger from '@/hooks/useBottomScrollTrigger';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface FollowerListButtonProps {
  isMe: boolean;
  otherUserId: number;
  count: number;
}

export default function FollowerListButton({ isMe, otherUserId, count }: FollowerListButtonProps) {
  const { t } = useTranslation();
  const {
    data: meFollower,
    isLoading: meFollowerLoading,
    fetchNextPage: meFollowerFetchNextPage,
    isFetchingNextPage: meFollowerIsFetchingNextPage,
  } = useFollower(isMe);
  const {
    data: otherFollower,
    isLoading: otherFollowerLoading,
    fetchNextPage: otherFollowerFetchNextPage,
    isFetchingNextPage: otherFollowerIsFetchingNextPage,
  } = useOtherFollower(isMe, otherUserId);

  const isLoading = isMe ? meFollowerLoading : otherFollowerLoading;
  const data = isMe ? meFollower : otherFollower;
  const fetchNextPage = isMe ? meFollowerFetchNextPage : otherFollowerFetchNextPage;
  const isFetchingNextPage = isMe ? meFollowerIsFetchingNextPage : otherFollowerIsFetchingNextPage;

  const scrollRef = useBottomScrollTrigger(fetchNextPage, isFetchingNextPage, 20);
  return (
    <Dialog>
      <DialogTrigger asChild className="outline-none">
        <button
          disabled={count <= 0}
          className={cn('flex items-center space-x-1', count <= 0 && 'text-primarySlate')}
        >
          <DialogDescription
            className={cn('text-black text-[18px]', count <= 0 && 'text-primarySlate')}
          >
            {t('follow.follower')}
          </DialogDescription>
          <span className="font-bold text-center text-[18px]">{count}</span>
        </button>
      </DialogTrigger>
      <DialogContent hideCloseButton className="w-[340px] web:w-[348px] h-420 p-0 overflow-hidden">
        <DialogTitle className="grid grid-cols-3 w-full mb-2 section-heading h-[50px] px-2.5">
          <div />
          <div className="flex items-center justify-center">
            <span className="text-center">{t('follow.follower')}</span>
          </div>
          <DialogClose
            asChild
            className="flex items-center justify-end w-full web:py-2 mobile:py-[13px]"
          >
            <button>
              <XIcon className="w-[34px] h-[34px]" />
            </button>
          </DialogClose>
        </DialogTitle>
        <div className="pr-[5px] w-full">
          <article
            ref={scrollRef}
            className="w-full px-[19px] h-[370px] flex flex-col overflow-y-scroll"
          >
            {isLoading ? (
              <Loading className="w-full pl-[5px]" />
            ) : (
              <>
                {data?.pages?.map((followerList) =>
                  followerList?.content?.map((follower) => (
                    <DialogClose asChild>
                      <Link
                        to={`/profile/${follower?.userId}`}
                        key={follower.userId}
                        className="flex items-center w-full py-[6px] between justify-start"
                      >
                        <figure className="flex items-center gap-[6px]">
                          <Avatar className="w-11 h-11">
                            <AvatarImage
                              src={follower.imageUrl}
                              alt={`${follower.name}님의 프로필`}
                            />
                            <AvatarFallback>{follower.name}</AvatarFallback>
                          </Avatar>
                          <figcaption className="font-bold text-text-xs">
                            {follower.name}
                          </figcaption>
                        </figure>
                      </Link>
                    </DialogClose>
                  ))
                )}
                {isFetchingNextPage && <Loading className="w-full h-5" />}
              </>
            )}
          </article>
        </div>
      </DialogContent>
    </Dialog>
  );
}
