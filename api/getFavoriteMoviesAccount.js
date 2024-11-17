import { fetchFavoriteMoviesAccountEndpoint } from "./MovieDB";

export const favoriteMoviesAccount = async (accountID, sessionID) => {
  try {
    return await fetchFavoriteMoviesAccountEndpoint(accountID, sessionID);
    
  } catch (error) {
    console.error("Error fetching favorite movies account:", error);
  }
};
