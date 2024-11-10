import axios from "axios";
import { apiKey, apiBaseUrl } from "../constants";

export const movie_id = ""; //Mỗi lần cần sử dụng để lấy thông tin chi tiết phim cần import movie_id, gán giá trị id và gọi hàm fetchDetailsMovie
export const person_id = "";
export const account_id = "";

//endpoints
const trendingMovieListEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const nowPlayingsMovieEndpoint = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const upcomingMovieEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;


const commentsMovieEndpoint = `${apiBaseUrl}/movie/${movie_id}/reviews?api_key=${apiKey}`; // Các đánh giá của bộ phim

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
export const fetchCreditsMovieEndpoint = (movieID) => {
  return apiCallGet(`${apiBaseUrl}/movie/${movieID}/credits?api_key=${apiKey}`);
};
export const fetchDetailsPeopleEndpoint = (personID) => {
  return apiCallGet(`${apiBaseUrl}/person/${personID}?api_key=${apiKey}`);
};
export const fetchMoviesCreditsEndpoint = (personID) => {
  return apiCallGet(
    `${apiBaseUrl}/person/${personID}/movie_credits?api_key=${apiKey}`
  );
};
export const fetchSimilarMovieEndpoint = (movieID) => {
  return apiCallGet(`${apiBaseUrl}/movie/${movieID}/similar?api_key=${apiKey}`);
};
export const fetchTrailerMovieEndpoint = (movieID) => {
  return apiCallGet(`${apiBaseUrl}/movie/${movieID}/videos?api_key=${apiKey}`);
};
export const fetchDetailsCreditsEndpoint = (creditID) => {
  return apiCallGet(`${apiBaseUrl}/credit/${creditID}?api_key=${apiKey}`);
};
export const fetchDetailsAccountEndpoint = (accountID, sessionID) => {
  return apiCallGet(`${apiBaseUrl}/account/${accountID}?api_key=${apiKey}&session_id=${sessionID}`);
};
export const fetchFavoriteMoviesAccountEndpoint = (accountID, sessionID) => {
  return apiCallGet(`${apiBaseUrl}/account/${accountID}/favorite/movies?api_key=${apiKey}&session_id=${sessionID}`);
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
