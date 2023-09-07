import LatitudeLongitude from "../models/LatitudeLongitude";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const checkBackendConnection = async (): Promise<boolean> => {
  try {
    await fetch(`${backendUrl}/auth`);
  } catch {
    return false;
  }
  return true;
};

export const getLatitudeLongitude = async (
  words: string,
): Promise<LatitudeLongitude> => {
  const response = await fetch(`${backendUrl}/What3Words/?words=${words}`);
  return await response.json();
};

export const getAllSpecies = async (): Promise<[]> => {
  const response = await fetch(`${backendUrl}/Species`);
  return await response.json();
};

export const createWhalePost = async (
  date: Date,
  lat: number,
  lon: number,
  species: number,
  description: string,
  imageUrl: string,
): Promise<boolean> => {
  const response = await fetch(`${backendUrl}/Post`, {
    method: "post",
    body: JSON.stringify({
      date,
      lat,
      lon,
      species,
      description,
      imageUrl,
    }),
  });
  return await response.json();
};
