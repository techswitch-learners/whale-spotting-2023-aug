interface UserData {
  id: number;
  username: string;
  email: string;
  name: string;
  profileImageUrl: string;
  posts: {
    id: number;
    imageUrl: string;
    description: string;
  }[];
}

export default UserData;
