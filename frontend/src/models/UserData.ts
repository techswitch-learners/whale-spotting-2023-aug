import PostData from "./PostData";

interface UserData {
  id: number;
  username: string;
  email: string;
  name: string;
  profileImageUrl: string;
  posts: PostData[];
}

export default UserData;
