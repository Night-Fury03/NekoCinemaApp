import axios from "axios";
import { apiKey, apiBaseUrl } from "../constants";

export const movie_id = ""; //Mỗi lần cần sử dụng để lấy thông tin chi tiết phim cần import movie_id, gán giá trị id và gọi hàm fetchDetailsMovie
export const person_id = "";
export const account_id = "";

//endpoints
const trendingMovieListEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const nowPlayingsMovieEndpoint = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const upcomingMovieEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const detailsMovieEndpoint = `${apiBaseUrl}/movie/${movie_id}?api_key=${apiKey}`;
const commentsMovieEndpoint = `${apiBaseUrl}/movie/${movie_id}/reviews?api_key=${apiKey}`; // Các đánh giá của bộ phim
const detailsPersonEndpoint = `${apiBaseUrl}/person/${person_id}?api_key=${apiKey}`;
const detailsAccountEndpoint = `${apiBaseUrl}/account/${account_id}?api_key=${apiKey}`;
const favoriteMoviesAccountEndpoint = `${apiBaseUrl}/account/${account_id}/favorite/movies?api_key=${apiKey}`;

// METHOD GET
const apiCallGet = async (endpoint, params) => {
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

export const fetchTrendingMovieList = () => {
  return apiCallGet(trendingMovieListEndpoint);
};
export const fetchDetailsMovie = () => {
  return apiCallGet(detailsMovieEndpoint);
};
export const fetchNowPlayingsMovieEndpoint = () => {
  return apiCallGet(nowPlayingsMovieEndpoint);
};
export const fetchUpcomingMovieEndpoint = () => {
  return apiCallGet(upcomingMovieEndpoint);
};
export const fetchCommentsMovieEndpoint = () => {
  return apiCallGet(commentsMovieEndpoint);
};
export const fetchDetailsMovieEndpoint = (movieID) => {
  return apiCallGet(`${apiBaseUrl}/movie/${movieID}?api_key=${apiKey}`);
};
// Credits - Lấy cast
// Similar movies - Phim tương tự
// Lấy trailer movies thông qua video movies
export const fetchDetailsPersonEndpoint = () => {
  return apiCallGet(detailsPersonEndpoint);
};
export const fetchDetailsAccountEndpoint = () => {
  return apiCallGet(detailsAccountEndpoint);
};
export const fetchFavoriteMoviesAccountEndpoint = () => {
  return apiCallGet(favoriteMoviesAccountEndpoint);
};

//METHOD POST
const addToFavoriteMoviesAccountEndpoint = `${apiBaseUrl}/account/${account_id}/favorite?api_key=${apiKey}`;

const apiCallPost = async (endpoint, data) => {
  const options = {
    method: "POST",
    url: endpoint,
    data: data ? data : {},
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
};
