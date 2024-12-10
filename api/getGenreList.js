import { fetchGenreList } from "./MovieDB";

export const genreList = async () => {
  try {
    return await fetchGenreList();
  } catch (error) {
    console.error("Error fetching trending movies list:", error);
  }
};
