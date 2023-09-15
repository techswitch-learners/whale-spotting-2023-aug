interface BodyOfWaterData {
  id: number;
  name: string;
  posts: {
    id: number;
    imageUrl: string;
    description: string;
  }[];
}

export default BodyOfWaterData;
