import axios from "axios";
import { apiKey, apiBaseUrl } from "../constants";

export const movie_id = ""; //Mỗi lần cần sử dụng để lấy thông tin chi tiết phim cần import movie_id, gán giá trị id và gọi hàm fetchDetailsMovie
export const person_id = "";
//endpoints
const trendingMovieListEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const nowPlayingsMovieEndpoint = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const upcomingMovieEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const detailsMovieEndpoint = `${apiBaseUrl}/movie/${movie_id}?api_key=${apiKey}`;
const commentsMovieEndpoint = `${apiBaseUrl}/movie/${movie_id}/reviews?api_key=${apiKey}`;// Các đánh giá của bộ phim
const creditsMovieEndpoint = `${apiBaseUrl}/movie/${movie_id}/credits?api_key=${apiKey}`;// Các diễn viên đóng bộ phim
const personEndpoint = `${apiBaseUrl}/person/${person_id}s?api_key=${apiKey}`;

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

export const fetchTrendingMovieList = () => {
  return apiCall(trendingMovieListEndpoint);
};
export const fetchDetailsMovie = () => {
  return apiCall(detailsMovieEndpoint);
};
export const fetchNowPlayingsMovieEndpoint = () => {
  return apiCall(nowPlayingsMovieEndpoint);
};
export const fetchUpcomingMovieEndpoint = () => {
  return apiCall(upcomingMovieEndpoint);
};
export const fetchCommentsMovieEndpoint = () => {
  return apiCall(commentsMovieEndpoint);
};
export const fetchCreditsMovieEndpoint = () => {
  return apiCall(creditsMovieEndpoint);
};
export const fetchPersonEndpoint = () => {
  return apiCall(personEndpoint);
};
