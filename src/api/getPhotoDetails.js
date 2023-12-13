import axiosClient from "./axiosClient";

export const getPhotoDetails = async (photoId) => {
  try {
    const response = await axiosClient.get(`/photos/${photoId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении деталей фотографии: ", error);
    throw error;
  }
};
