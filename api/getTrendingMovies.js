import { fetchTrendingMovieList } from "./MovieDB";

export const trendingMovieList = async () => {
  try {
    return await fetchTrendingMovieList();
  } catch (error) {
    console.error("Error fetching trending movies list:", error);
  }
};
