interface Post {
  id: number;
  imageUrl: string;
  description: string;
}

export interface BodyOfWater {
  id: number;
  name: string;
  posts: Post[];
}

export interface BodiesOfWater {
  bodiesOfWater: BodyOfWater[];
}
