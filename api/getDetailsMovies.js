import { fetchDetailsMovieEndpoint } from "./MovieDB";

export const detailedMovieList = async (movieID) => {
  try {
    return await fetchDetailsMovieEndpoint(movieID);
    
  } catch (error) {
    console.error("Error fetching playing movie list:", error);
  }
};
