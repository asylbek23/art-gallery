import axiosClient from "./axiosClient";

export const getRandomPhotos = async (count = 9) => {
  try {
    const response = await axiosClient.get(`/photos/random?count=${count}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
