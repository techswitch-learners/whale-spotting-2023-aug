export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const checkBackendConnection = async (): Promise<boolean> => {
  try {
    await fetch(`${backendUrl}/auth`);
  } catch {
    return false;
  }
  return true;
};

export const tryEmailAndPassword = async (
  email: string,
  password: string,
): Promise<boolean> => {
  const response = await fetch(`${backendUrl}/Auth/`, {
    headers: {
      Authorization: `Basic ${btoa(email + ":" + password)}`,
    },
  });
  return response.ok;
};

export const tryRegisterNewUser = async (
  fullName: string,
  username: string,
  email: string,
  password: string,
): Promise<boolean> => {
  const response = await fetch(`${backendUrl}/Register/`, {
    headers: {
      Authorization: `Basic ${btoa(email + ":" + password)}`, // Not sure if this needs to be here or something else as creating new user
    },
  });
  return response.ok;
};
