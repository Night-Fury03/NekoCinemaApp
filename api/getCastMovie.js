import { fetchCreditsMovieEndpoint } from "./MovieDB";

export const castMovieList = async (movieID) => {
  try {
    return await fetchCreditsMovieEndpoint(movieID);
  } catch (error) {
    console.error("Error fetching casts movie list:", error);
  }
};
