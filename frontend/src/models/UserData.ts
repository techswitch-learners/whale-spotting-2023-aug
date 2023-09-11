interface UserData {
  id: number;
  username: string;
  email: string;
  name: string;
  profileImageUrl: string;
  posts: Post[];
}

interface Post {
  id: number;
  imageUrl: string;
  description: string;
}

export default UserData;
