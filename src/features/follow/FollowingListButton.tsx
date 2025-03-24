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
import useFollowing from '@/hooks/queries/follow/useFollowing';
import useOtherFollowing from '@/hooks/queries/follow/useOtherFollowing';
import useBottomScrollTrigger from '@/hooks/useBottomScrollTrigger';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ProfileFollowingButton from './ProfileFollowingButton';
import { useTranslation } from 'react-i18next';

interface FollowingListButtonProps {
  isMe: boolean;
  otherUserId: number;
  count: number;
}

export default function FollowingListButton({
  isMe,
  otherUserId,
  count,
}: FollowingListButtonProps) {
  const { t } = useTranslation();
  const {
    data: meFollowing,
    isLoading: meFollowingLoading,
    fetchNextPage: meFollowingFetchNextPage,
    isFetchingNextPage: meFollowingIsFetchingNextPage,
  } = useFollowing(isMe);
  const {
    data: otherFollowing,
    isLoading: otherFollowingLoading,
    fetchNextPage: otherFollowingFetchNextPage,
    isFetchingNextPage: otherFollowingIsFetchingNextPage,
  } = useOtherFollowing(isMe, otherUserId);

  const isLoading = isMe ? meFollowingLoading : otherFollowingLoading;
  const data = isMe ? meFollowing : otherFollowing;
  const fetchNextPage = isMe ? meFollowingFetchNextPage : otherFollowingFetchNextPage;
  const isFetchingNextPage = isMe
    ? meFollowingIsFetchingNextPage
    : otherFollowingIsFetchingNextPage;

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
            {t('follow.following')}
          </DialogDescription>
          <span className="font-bold text-center text-[18px]">{count}</span>
        </button>
      </DialogTrigger>
      <DialogContent hideCloseButton className="w-[340px] web:w-[348px] h-420 p-0 overflow-hidden">
        <DialogTitle className="grid grid-cols-3 w-full mb-2 section-heading h-[50px] px-2.5">
          <div />
          <div className="flex items-center justify-center">
            <span className="text-center">{t('follow.following')}</span>
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
                {data?.pages.map((followingList) =>
                  followingList.content.map((following) => (
                    <div
                      key={following.userId}
                      className="flex items-center w-full py-[6px] between justify-between"
                    >
                      <DialogClose asChild>
                        <Link
                          to={`/profile/${following?.userId}`}
                          className="flex items-center w-full"
                        >
                          <figure className="flex items-center gap-[6px]">
                            <Avatar className="w-11 h-11">
                              <AvatarImage
                                src={following.imageUrl}
                                alt={`${following.name}님의 프로필`}
                              />
                              <AvatarFallback>{following.name}</AvatarFallback>
                            </Avatar>
                            <figcaption className="font-bold text-text-xs">
                              {following.name}
                            </figcaption>
                          </figure>
                        </Link>
                      </DialogClose>
                      {isMe && (
                        <div className="z-20">
                          <ProfileFollowingButton otherUserId={following.userId} />
                        </div>
                      )}
                    </div>
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
