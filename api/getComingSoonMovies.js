import { fetchUpcomingMovieEndpoint } from "./MovieDB";

export const upcomingMovieList = async () => {
  try {
    return await fetchUpcomingMovieEndpoint();
    
  } catch (error) {
    console.error("Error fetching coming soon movies list:", error);
  }
};
