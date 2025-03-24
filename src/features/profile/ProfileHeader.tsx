import VerifiedLabelIcon from '@/components/Icons/VerifiedLabelIcon';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link, useParams } from 'react-router-dom';
import useUser from '@/hooks/queries/user/useUser';
import useOtherUser from '@/hooks/queries/user/useOtherUser';
import ProfileHeaderSkeleton from '@/components/Skeleton/ProfileHeaderSkeleton';
import FollowingListButton from '../follow/FollowingListButton';
import FollowerListButton from '../follow/FollowerListButton';
import { useTranslation } from 'react-i18next';

function ProfileHeader() {
  const { userId } = useParams();
  const { user, isLoading: userLoading } = useUser();
  const { t } = useTranslation();

  const isMe = user?.userId === Number(userId);
  const { data: otherUserData, isLoading: otherUserLoading } = useOtherUser(Number(userId), {
    enabled: !isMe,
  });

  const data = isMe ? user : otherUserData;
  const isLoading = isMe ? userLoading : otherUserLoading;

  return (
    <>
      {isLoading ? (
        <ProfileHeaderSkeleton isMe={isMe} />
      ) : (
        <section className="flex flex-col items-center justify-start w-full pb-5 web:pb-[30px]">
          <section>
            <Avatar className="w-[60px] h-[60px]">
              <AvatarImage src={data?.profileImage.imageUrl} alt={`${data?.name}님의 프로필`} />
            </Avatar>
          </section>
          <section className="gap-[6px] flex justify-center items-center my-3">
            <h2 className="pl-3 font-bold text-md web:text-xl">{data?.name}</h2>
            <VerifiedLabelIcon className="w-[16.075px] h-[15.921px] web:w-[22px] web:h-[21px]" />
          </section>
          <section className="flex gap-[15px] py-1 text-text-lg web:text-text-2xl">
            <FollowerListButton
              isMe={isMe}
              otherUserId={Number(userId)}
              count={data?.follower || 0}
            />
            <div className="flex items-center">
              <Separator orientation="vertical" className="h-3 bg-primarySlate" />
            </div>
            <FollowingListButton
              isMe={isMe}
              otherUserId={Number(userId)}
              count={data?.following || 0}
            />
          </section>
          <section className="flex my-[7px] flex-col gap-[10px] web:gap-[15px] items-center text-primarySlate text-text-xs web:text-text-sm">
            <h3 className="font-medium text-center">
              {data?.description
                ? data?.description
                : t('myProfile.defaultBio')
                    .split('\n')
                    .map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
            </h3>
            <h3>{data?.instagramId ? data.instagramId : '@spoteditorofficial'}</h3>
          </section>
          {isMe && (
            <Link to="/profile-setting">
              <Button
                variant="outline"
                className="mt-[10px] web:mt-[15px] p-2 w-[50px] web:w-[60px] h-[24px] web:h-[28px] rounded-[60px] font-medium text-text-xs"
              >
                {t('myProfile.edit')}
              </Button>
            </Link>
          )}
        </section>
      )}
    </>
  );
}

export default ProfileHeader;
