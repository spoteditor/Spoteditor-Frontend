import { SubtractIcon } from '@/components/Icons';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useUser from '@/hooks/queries/user/useUser';
import { Link } from 'react-router-dom';
import LogFollowingButton from '../follow/LogFollowingButton';
import useOtherUser from '@/hooks/queries/user/useOtherUser';

interface OtherUserProfileSectionProps {
  userId: number;
}

export default function OtherUserProfileSection({ userId }: OtherUserProfileSectionProps) {
  const { user: userData } = useUser();
  const isMe = userData?.userId === userId;
  const { data: otherUserData } = useOtherUser(userId, { enabled: !!userId && !isMe });

  const data = isMe ? userData : otherUserData;
  return (
    <div className="flex items-center gap-2 py-[15px]">
      <Link to={`/profile/${userId}`} className="flex items-center gap-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={data?.profileImage.imageUrl} alt="user Avatar" />
        </Avatar>
        <div className="flex items-center gap-1.5">
          <p className="font-semibold text-text-sm">{data?.name}</p>
          <SubtractIcon />
        </div>
      </Link>
      {userData && userData?.userId && !isMe && (
        <LogFollowingButton
          otherUserId={userId}
          isFollowing={Boolean(otherUserData?.isFollowing)}
        />
      )}
    </div>
  );
}
