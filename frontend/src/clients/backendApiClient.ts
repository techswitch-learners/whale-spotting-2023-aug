import BodiesOfWaterData from "../models/BodiesOfWaterData";
import BodyOfWaterData from "../models/BodyOfWaterData";
import LatitudeLongitude from "../models/LatitudeLongitude";
import SpeciesListData from "../models/SpeciesListData";
import UsersData from "../models/UsersData";
import PostsData from "../models/PostsData";
import PostData from "../models/PostData";
import LeaderboardData from "../models/LeaderboardData";
import EventsData from "../models/EventsData";
import AuthData from "../models/AuthData";
import SpeciesData from "../models/SpeciesData";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const checkBackendConnection = async (): Promise<boolean> => {
  try {
    await fetch(`${backendUrl}/Auth`);
  } catch {
    return false;
  }
  return true;
};

export const getAllUsers = async (): Promise<UsersData> => {
  const response = await fetch(`${backendUrl}/User/all`);
  return response.json();
};

export const tryEncodedAuth = async (
  encodedAuth: string,
): Promise<AuthData> => {
  let data = null;
  const response = await fetch(`${backendUrl}/Auth/`, {
    headers: {
      Authorization: encodedAuth,
    },
  });

  if (response.ok) {
    data = await response.json();
  }
  return data;
};

export const getUserById = async (
  id: number,
  encodedAuth?: string,
): Promise<Response> => {
  let response;
  if (!encodedAuth) {
    response = await fetch(`${backendUrl}/User/${id}`);
  } else {
    response = await fetch(`${backendUrl}/User/${id}`, {
      headers: {
        Authorization: encodedAuth,
      },
    });
  }
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
    headers: {
      "Content-Type": "application/json",
    },
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
  const speciesData = await response.json();
  if (speciesData) {
    speciesData.speciesList.sort((a: SpeciesData, b: SpeciesData) => {
      return a.name > b.name;
    });
  }
  return speciesData;
};

export const createWhalePost = async (
  date: Date,
  latitude: number,
  longitude: number,
  speciesId: number,
  description: string,
  imageUrl: string,
  encodedAuth: string,
): Promise<boolean> => {
  const response = await fetch(`${backendUrl}/Post`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: encodedAuth,
    },
    body: JSON.stringify({
      date,
      latitude,
      longitude,
      speciesId,
      description,
      imageUrl,
    }),
  });
  return response.ok;
};

export const getAllBodiesOfWater = async (): Promise<BodiesOfWaterData> => {
  const response = await fetch(`${backendUrl}/BodyOfWater/all`);
  const bodiesOfWaterData = await response.json();
  if (bodiesOfWaterData) {
    bodiesOfWaterData.bodiesOfWater.sort(
      (a: BodyOfWaterData, b: BodyOfWaterData) => {
        return a.name > b.name;
      },
    );
  }
  return bodiesOfWaterData;
};

export const getBodyOfWaterByName = async (
  name: string,
  encodedAuth?: string,
): Promise<Response> => {
  let response;
  if (!encodedAuth) {
    response = await fetch(`${backendUrl}/BodyOfWater/${name}`);
  } else {
    response = await fetch(`${backendUrl}/BodyOfWater/${name}`, {
      headers: {
        Authorization: encodedAuth,
      },
    });
  }
  return response;
};

export const getLatestPosts = async (): Promise<PostData[]> => {
  const response = await fetch(`${backendUrl}/Post/all`);
  const postsData = await response.json();
  if (postsData) {
    postsData.posts.sort((a: PostData, b: PostData) => {
      return Date.parse(b.creationTimestamp) - Date.parse(a.creationTimestamp);
    });
  }
  const filteredResponse = postsData.posts.slice(0, 5);
  return filteredResponse;
};

export const getLeaderboard = async (): Promise<LeaderboardData> => {
  const response = await fetch(`${backendUrl}/Leaderboard`);
  return await response.json();
};

export const createEvent = async (
  name: string,
  startDate: Date,
  durationInHours: number,
  location: string,
  link: string,
  imageUrl: string,
  encodedAuth: string,
): Promise<boolean> => {
  const response = await fetch(`${backendUrl}/Event`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: encodedAuth,
    },
    method: "POST",
    body: JSON.stringify({
      name,
      startDate,
      durationInHours,
      location,
      link,
      imageUrl,
    }),
  });
  return response.ok;
};

export const getAllPosts = async (encodedAuth?: string): Promise<PostsData> => {
  let response;
  if (!encodedAuth) {
    response = await fetch(`${backendUrl}/Post/all`);
  } else {
    response = await fetch(`${backendUrl}/Post/all`, {
      headers: {
        Authorization: encodedAuth,
      },
    });
  }
  return await response.json();
};

export const getAllEvents = async (): Promise<EventsData> => {
  const response = await fetch(`${backendUrl}/Event/all`);
  return await response.json();
};

export const getAllPendingPosts = async (
  encodedAuth: string,
): Promise<PostsData> => {
  const response = await fetch(`${backendUrl}/Post/pending`, {
    headers: { Authorization: encodedAuth },
  });
  return await response.json();
};

export const approveOrRejectPost = async (
  id: number,
  approvalStatus: number,
  encodedAuth: string,
): Promise<boolean> => {
  const response = await fetch(`${backendUrl}/Post/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: encodedAuth,
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
  latitude: number,
  longitude: number,
  speciesId: number,
  description: string,
  imageUrl: string,
  encodedAuth: string,
): Promise<boolean> => {
  const response = await fetch(`${backendUrl}/Post/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: encodedAuth,
    },
    body: JSON.stringify({
      date,
      latitude,
      longitude,
      speciesId,
      description,
      imageUrl,
    }),
  });
  return response.ok;
};

export const interactWithPost = async (
  postId: number,
  encodedAuth: string,
): Promise<boolean> => {
  const response = await fetch(`${backendUrl}/Interaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: encodedAuth,
    },
    body: JSON.stringify({
      PostId: postId,
    }),
  });
  return response.ok;
};

export const getPostById = async (id: number): Promise<Response> => {
  const response = await fetch(`${backendUrl}/Post/${id}`);
  return response;
};

export const searchPosts = async (
  bodyOfWaterName?: string,
  speciesName?: string,
  encodedAuth?: string,
): Promise<PostsData> => {
  let response;
  const url = `${backendUrl}/Post/search`;
  const urlSearchParams = new URLSearchParams();
  if (bodyOfWaterName) {
    urlSearchParams.append("bodyOfWaterName", bodyOfWaterName);
  }
  if (speciesName) {
    urlSearchParams.append("speciesName", speciesName);
  }
  if (!encodedAuth) {
    response = await fetch(`${url}?${urlSearchParams.toString()}`);
  } else {
    response = await fetch(`${url}?${urlSearchParams.toString()}`, {
      headers: {
        Authorization: encodedAuth,
      },
    });
  }
  return await response.json();
};
