import { fetchSimilarMovieEndpoint } from "./MovieDB";

export const similarMovieList = async (movieID) => {
  try {
    return await fetchSimilarMovieEndpoint(movieID);
  } catch (error) {
    console.error("Error fetching get similar movies list:", error);
  }
};
