import { fetchDetailsCreditsEndpoint } from "./MovieDB";

export const detailsCreditsList = async (creditID) => {
  try {
    return await fetchDetailsCreditsEndpoint(creditID);
    
  } catch (error) {
    console.error("Error fetching details credits list:", error);
  }
};
