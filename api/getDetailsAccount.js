import { fetchDetailsAccountEndpoint } from "./MovieDB";

export const detailsAccount = async (accountID, sessionID) => {
  try {
    return await fetchDetailsAccountEndpoint(accountID, sessionID);
    
  } catch (error) {
    console.error("Error fetching details account:", error);
  }
};
