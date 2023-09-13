import { BodiesOfWater, BodyOfWater } from "../models/BodyOfWater";
import LatitudeLongitude from "../models/LatitudeLongitude";
import SpeciesListData from "../models/SpeciesListData";
import UserData from "../models/UserData";
import UsersData from "../models/UsersData";
import PostsData from "../models/PostsData";
import PostData from "../models/PostData";
import EventData from "../models/EventData";

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

export const getAllBodiesOfWater = async (): Promise<BodiesOfWater> => {
  const response = await fetch(`${backendUrl}/BodyOfWater/all`);
  const unsortedBodiesOfWater = await response.json();
  if (unsortedBodiesOfWater) {
    unsortedBodiesOfWater.bodiesOfWater.sort(
      (a: BodyOfWater, b: BodyOfWater) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      },
    );
  }
  return unsortedBodiesOfWater;
};

export const getLatestPosts = async (): Promise<PostData[]> => {
  const response = await fetch(`${backendUrl}/Post/all`);
  const allResponse = await response.json();
  if (allResponse) {
    allResponse.posts.sort((a: PostData, b: PostData) => {
      return Date.parse(b.timestamp) - Date.parse(a.timestamp);
    });
  }
  const filteredResponse = allResponse.posts.slice(0, 5);

  return filteredResponse;
};

export const getLeaderboard = async (): Promise<UserData[]> => {
  const response = await getAllUsers();
  if (response) {
    response.users.sort((a: UserData, b: UserData) => {
      return b.rating - a.rating;
    });
  }

  return response.users.slice(0, 10);
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

export const getAllPosts = async (): Promise<PostsData> => {
  const response = await fetch(`${backendUrl}/Post/all`);
  return await response.json();
};

export const getEvents = async (): Promise<EventData[]> => {
  const response = await fetch(`${backendUrl}/event/all`);
  const data = await response.json();
  let events;
  if (data) {
    events = data.events;
  }
  return events;
};
