import { fetchUpcomingMovieEndpoint } from "./MovieDB";

export const upcomingMovieList = async () => {
  try {
    return await fetchUpcomingMovieEndpoint();
    
  } catch (error) {
    console.error("Error fetching playing movie list:", error);
  }
};
