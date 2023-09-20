interface PostData {
  id: number;
  user: {
    id: number;
    name: string;
    profileImageUrl: string;
  };
  latitude: number;
  longitude: number;
  creationTimestamp: string;
  species: {
    id: number;
    name: string;
  };
  imageUrl: string;
  description: string;
  approvalStatus: number;
  interactionCount: number;
  hasInteractionFromCurrentUser?: boolean;
  bodyOfWater: {
    id: number;
    name: string;
  };
}

export default PostData;
