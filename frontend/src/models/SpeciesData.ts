import PostsData from "./PostsData";

interface SpeciesWhale {
  tagNumber: number;
  name: string;
}

interface SpeciesData {
  id: number;
  name: string;
  latinName: string;
  description: string;
  whales: SpeciesWhale[];
  posts: PostsData;
}

export default SpeciesData;
