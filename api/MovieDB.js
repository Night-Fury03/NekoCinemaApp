import axios from "axios";
import { apiKey } from "../constants";
import {apiBaseUrl} from "../constants/index";
//endpoints
const detailsMovieEndpoint = `${apiBaseUrl}/movie/movie_id?api_key=${apiKey}`;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
};

export const fetchTopRatedMovieList = () => {
  return apiCall(topRatedMovieListEndpoint);
};
export const fetchDetailsMovie = () => {
  return apiCall(detailsMovieEndpoint);
};
