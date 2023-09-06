import { UserData } from "../pages/Users";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const checkBackendConnection = async (): Promise<boolean> => {
  try {
    await fetch(`${backendUrl}/auth`);
  } catch {
    return false;
  }
  return true;
};

export const retrieveUsers = async (id: number): Promise<UserData> => {
  const response = await fetch(`${backendUrl}/User/${id}`);

  return response.json();
};
