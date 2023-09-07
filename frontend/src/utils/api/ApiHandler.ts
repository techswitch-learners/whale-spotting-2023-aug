import handleRequest from "./HandleRequest";

export interface RequestParams {
  endpoint: string;
  method?: string;
  headers?: Headers;
  body?: string;
}

export const getAllPosts = async () => {
  const requestParams: RequestParams = { endpoint: "/posts/all" };

  const { data, errorMessage } = await handleRequest(requestParams);

  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(data);
    return data;
  }
};
