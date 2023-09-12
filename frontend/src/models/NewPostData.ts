export interface NewPostData {
  id: number;
  user: User;
  timestamp: string;
  species: Species;
  imageUrl: string;
  description: string;
  approvalStatus: number;
  rating: number;
  bodyOfWater: PostBodyOfWater;
}

export interface User {
  id: number;
  name: string;
  profileImageUrl: string;
}

export interface Species {
  id: number;
  name: string;
}

export interface PostBodyOfWater {
  id: number;
  name: string;
}
