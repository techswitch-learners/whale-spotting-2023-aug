import SearchPostData from "./SearchPostData";

interface BodyOfWaterData {
  id: number;
  name: string;
  posts: SearchPostData[];
}

export default BodyOfWaterData;
