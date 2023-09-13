export interface BodyOfWater {
  id: number;
  name: string;
  posts: {
    id: number;
    imageUrl: string;
    description: string;
  };
}

export interface BodiesOfWater {
  bodiesOfWater: BodyOfWater[];
}
