interface PostDataMap {
  id: number;
  user: {
    id: number;
    name: string;
    profileImageUrl: string;
  };
  timestamp: string;
  species: {
    id: number;
    name: string;
  };
  imageUrl: string;
  description: string;
  approvalStatus: number;
  rating: number;
  bodyOfWater: {
    id: number;
    name: string;
  };
  longitude: number;
  latitude: number;
}

export default PostDataMap;
