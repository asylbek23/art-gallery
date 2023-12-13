import axiosClient from "./axiosClient";

export const searchPhotos = async (query, page = 1) => {
  try {
    const response = await axiosClient.get(`/search/photos`, {
      params: {
        query: query,
        page: page,
        per_page: 9, // количество фотографий на страницу
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
