import { fetchMoviesCreditsEndpoint } from "./MovieDB";

export const moviesCreditsList = async (personID) => {
  try {
    return await fetchMoviesCreditsEndpoint(personID);
    
  } catch (error) {
    console.error("Error fetching movies credits list:", error);
  }
};
