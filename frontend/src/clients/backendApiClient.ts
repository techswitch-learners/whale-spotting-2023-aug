import LatitudeLongitude from "../models/LatitudeLongitude";
import SpeciesListData from "../models/SpeciesListData";
import UsersData from "../models/UsersData";
import UserData from "../models/UserData";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const checkBackendConnection = async (): Promise<boolean> => {
  try {
    await fetch(`${backendUrl}/auth`);
  } catch {
    return false;
  }
  return true;
};

export const getAllUsers = async (): Promise<UsersData> => {
  const response = await fetch(`${backendUrl}/User/all`);
  return response.json();
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

export const GetById = async (id: number): Promise<UserData> => {
  const response = await fetch(`${backendUrl}/User/id/${id}`);
  return response.json();
};

export const registerNewUser = async (
  fullName: string,
  username: string,
  email: string,
  password: string,
  profileImageUrl: string,
): Promise<boolean> => {
  const response = await fetch(`${backendUrl}/User/`, {
    method: "POST",
    body: JSON.stringify({
      Username: username,
      Password: password,
      Email: email,
      Name: fullName,
      ProfileImageUrl:
        profileImageUrl ||
        "https://t3.ftcdn.net/jpg/00/88/76/06/360_F_88760637_XGc6SZe1IsXRKTrqYa0Vr2lOintmCYzZ.jpg",
    }),
  });
  return response.ok;
};

export const getLatitudeLongitude = async (
  words: string,
): Promise<LatitudeLongitude> => {
  const response = await fetch(`${backendUrl}/What3Words/?words=${words}`);
  return await response.json();
};

export const getAllSpecies = async (): Promise<SpeciesListData> => {
  const response = await fetch(`${backendUrl}/Species/all`);
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
