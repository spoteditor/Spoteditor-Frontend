import CustomPagination from '@/components/CustomPagination';
import Loading from '@/components/Loading';
import MotionCard from '@/components/MotionCard';
import ProfileFallbackMessage from '@/features/profile/fallback/ProfileFallbackMessage';
import {
  PostCardImage,
  PostCardLocation,
  PostCardTitle,
  PostCardWrapper,
} from '@/features/profile/PostCard';
import SavePlaceBookMarkButton from '@/features/profile/profileBookMark/SavePlaceBookMarkButton';
import useUser from '@/hooks/queries/user/useUser';
import useOtherUserBookmarkPlaces from '@/hooks/queries/userLog/useOtherUserBookmarkPlaces';
import useUserBookmarkPlaces from '@/hooks/queries/userLog/useUserBookmarkPlaces';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { useLayoutEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

function SavedSpaces() {
  const { data: user } = useUser();
  const { userId } = useParams();
  const [searchParams] = useSearchParams();

  const pageNumber = searchParams.get('pageNumber');

  const isMySaveSpaces = user?.userId === Number(userId);

  const {
    data: myPlaceData,
    isPending: myPlacePending,
    refetch: myPlacesRefetch,
  } = useUserBookmarkPlaces({ page: Number(pageNumber) }, { enabled: isMySaveSpaces });
  const {
    data: otherPlaceData,
    isPending: otherPlacePending,
    refetch: otherPlacesRefetch,
  } = useOtherUserBookmarkPlaces(
    Number(userId),
    { page: Number(pageNumber) },
    { enabled: !isMySaveSpaces }
  );

  const data = isMySaveSpaces ? myPlaceData : otherPlaceData;
  const isPending = isMySaveSpaces ? myPlacePending : otherPlacePending;
  const refetch = isMySaveSpaces ? myPlacesRefetch : otherPlacesRefetch;

  useLayoutEffect(() => {
    if (data) {
      refetch();
    }
  }, [data, refetch]);
  return (
    <>
      {isPending ? (
        <Loading className="min-h-[350px]" />
      ) : data?.content.length !== 0 ? (
        <>
          <PostCardWrapper className="mb-[50px]">
            {data?.content.map((place) => (
              <MotionCard key={place.placeId} className="relative group">
                {/* 추후 주소가 나오면 링크 컴포넌트로 보내는 기능 추가 */}
                <PostCardImage
                  lable
                  author={place.author}
                  imageUrl={getImgFromCloudFront(place.image.storedFile)}
                />
                <PostCardTitle title={place.name} />
                <PostCardLocation
                  sido={place.address.sido}
                  bname={place.address.bname}
                  sigungu={place.address.sigungu}
                />
                {user?.userId ? <SavePlaceBookMarkButton placeId={place.placeId} /> : null}
              </MotionCard>
            ))}
          </PostCardWrapper>
          <section className="mt-[50px]">
            <CustomPagination
              currentPage={Number(data?.pageNumber)}
              totalPages={Number(data?.totalPages)}
            />
          </section>
        </>
      ) : (
        <ProfileFallbackMessage resourceName="장소" />
      )}
    </>
  );
}

export default SavedSpaces;
