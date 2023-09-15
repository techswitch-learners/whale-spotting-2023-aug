interface PostData {
  id: number;
  user: {
    id: number;
    name: string;
    profileImageUrl: string;
  };
  latitude: number;
  longitude: number;
  timestamp: string;
  species: {
    id: number;
    name: string;
  };
  imageUrl: string;
  description: string;
  approvalStatus: number;
  likes: number;
  bodyOfWater: {
    id: number;
    name: string;
  };
}

export default PostData;
