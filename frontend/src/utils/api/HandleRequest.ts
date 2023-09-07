export interface RequestParams {
  endpoint: string;
  method?: string;
  headers?: Headers;
  body?: string;
}

const ServerResponseMessages: { [key: string]: string } = {
  401: "Missing credentials",
  403: "Forbidden Request",
  404: "Invalid Path in Request",
  503: "Service Unavailable. Try again",
  504: "Server Timeout. Try again",
};

const handleRequest = async (requestParams: RequestParams) => {
  let data = null;
  let errorMessage = null;

  const url = `https://localhost:7082${requestParams.endpoint}`;

  try {
    // Check set parameters
    // If not set a default GET request, empty headers and no body
    const response = await fetch(url, {
      method: requestParams.method ? requestParams.method : "GET",
      headers: requestParams.headers ? requestParams.headers : {},
      body: requestParams.body ? JSON.stringify(requestParams.body) : null,
    });

    if (!response.ok) {
      const responseCode = response.status.toString();
      const customErrMsg = ServerResponseMessages[responseCode];
      if (customErrMsg) {
        throw new Error(
          `Request failed. Message: ${customErrMsg} Code: ${response.status}`,
        );
      }
      throw new Error(
        `Request failed. Message: ${response.statusText} Code: ${response.status}`,
      );
    }

    data = await response.json();

    // applyData(data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      const errorMsg = err.message || "Something went wrong!";
      errorMessage = `Error in request : ${errorMsg}`;
    }
  }

  return { data, errorMessage };
};

export default handleRequest;
