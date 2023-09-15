import PostData from "./PostData";

export interface BodyOfWater {
  id: number;
  name: string;
  posts: PostData[];
}

export interface BodiesOfWater {
  bodiesOfWater: BodyOfWater[];
}
