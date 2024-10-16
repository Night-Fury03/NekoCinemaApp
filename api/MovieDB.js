import axios from "axios";
import { apiKey } from "../constants";

//endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const topRatedMovieListEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const detailsTVSeriesEndpoint = `${apiBaseUrl}/tv/series_id?api_key=${apiKey}`;
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
export const fetchDetailsTVSeries = () => {
  return apiCall(detailsTVSeriesEndpoint);
};
export const fetchDetailsMovie = () => {
  return apiCall(detailsMovieEndpoint);
};
