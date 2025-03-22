interface IAddress {
  address: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  sido: string;
  bname: string;
  sigungu: string;
}

interface IUserPlaceLog {
  userName: string;
  id: number;
  name: string;
  imageUrl: string;
  address: IAddress;
}

interface IUserBookmarkPlace extends IUserPlaceLog {
  category: string;
}

export interface IUser {
  userId: number;
  name: string;
  instagramId: string;
  profileImage: { imageId: null; imageUrl: string };
  description: string;
  follower: number;
  following: number;
}

export interface IOhterUser extends IUser {
  isFollowing: boolean;
}

export interface IUpdateUser {
  name: string;
  imageUrl: string;
  description: string;
  instagramId: string;
}
