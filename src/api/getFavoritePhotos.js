import axiosClient from "./axiosClient";

export const getFavoritePhotos = async () => {
  try {
    // Извлекаем строку из localStorage и парсим её в объект
    const storedData = JSON.parse(localStorage.getItem("favorites") || "{}");

    // Обращаемся к свойству 'favorites' этого объекта, которое должно быть массивом
    const favorites = storedData.favorites || [];

    // Далее проверяем, что favorites действительно массив
    if (!Array.isArray(favorites)) {
      throw new TypeError("Favorites is not an array");
    }

    // Теперь, когда мы уверены, что favorites - это массив, можно использовать .map()
    const requests = favorites.map((id) => axiosClient.get(`/photos/${id}`));
    const responses = await Promise.all(requests);
    return responses.map((response) => response.data);
  } catch (error) {
    console.error(error);
    return [];
  }
};
