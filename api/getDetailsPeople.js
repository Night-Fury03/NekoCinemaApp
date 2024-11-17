import { fetchDetailsPeopleEndpoint } from "./MovieDB";

export const detailsPeopleList = async (personID) => {
  try {
    return await fetchDetailsPeopleEndpoint(personID);
    
  } catch (error) {
    console.error("Error fetching details people list:", error);
  }
};
