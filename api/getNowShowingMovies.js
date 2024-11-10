import { fetchNowPlayingsMovieEndpoint } from "./MovieDB";

export const playingMovieList = async () => {
  try {
    return await fetchNowPlayingsMovieEndpoint();
    
  } catch (error) {
    console.error("Error fetching playing movie list:", error);
  }
};
