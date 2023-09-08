import PostData from "./PostData";

interface PostDataResponse {
  posts?: PostData[];
  status: {
    ok: boolean;
    code?: number;
    text: string;
  };
}

export default PostDataResponse;
