import LatitudeLongitude from "../models/LatitudeLongitude";
import PostDataResponse from "../models/PostsData";
import SpeciesListData from "../models/SpeciesListData";
import UsersData from "../models/UsersData";
import PostsData from "../models/PostsData";

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

export const tryUserBase = async (userBase: string): Promise<boolean> => {
  const response = await fetch(`${backendUrl}/Auth/`, {
    headers: {
      Authorization: userBase,
    },
  });
  return response.ok;
};

export const getUserById = async (id: number): Promise<Response> => {
  const response = await fetch(`${backendUrl}/User/id/${id}`);
  return response;
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

export const createEvent = async (
  startDate: Date,
  duration: number,
  location: string,
  eventLink: string,
  eventImageUrl: string,
): Promise<boolean> => {
  const response = await fetch(`${backendUrl}/event`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      startDate,
      duration,
      location,
      eventLink,
      eventImageUrl,
    }),
  });
  return response.ok;
};

export const getAllPosts = async (
  userBase: string,
): Promise<PostDataResponse> => {
  if (userBase === "") {
    const response = await fetch(`${backendUrl}/Post/all`);
    return await response.json();
  }

  const response = await fetch(`${backendUrl}/Post/all`, {
    headers: {
      Authorization: userBase,
    },
  });
  return await response.json();
};

export const getAllPendingPosts = async (): Promise<PostsData> => {
  const response = await fetch(`${backendUrl}/Post/pending`);
  return await response.json();
};

export const approveOrRejectPost = async (
  id: number,
  approvalStatus: number,
): Promise<boolean> => {
  const response = await fetch(`${backendUrl}/post/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      approvalStatus,
    }),
  });
  return response.ok;
};

export const modifyPost = async (
  id: number,
  date: Date,
  lat: number,
  lon: number,
  speciesId: number,
  description: string,
  imageUrl: string,
): Promise<boolean> => {
  const response = await fetch(`${backendUrl}/post/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date,
      lat,
      lon,
      speciesId,
      description,
      imageUrl,
    }),
  });
  return response.ok;
};

export const likePost = async (
  postId: number,
  userBase: string,
): Promise<boolean> => {
  const response = await fetch(`${backendUrl}/Interaction/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: userBase,
    },
    body: JSON.stringify({
      PostId: postId,
    }),
  });
  console.log(response.status);
  return response.ok;
};
