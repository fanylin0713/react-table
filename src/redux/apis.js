import axios from "axios";
import queryString from "query-string";

const fetcher = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 10 * 60 * 1000,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

const apis = {
    fetachGetRealtimeWeather : (payload) => 
        fetcher.get(`/v1/rest/datastore/O-A0003-001?${queryString.stringify(payload)}`),

    fetchGetWeather36h : ({authorizationKey, ...payload}) => 
        fetcher.get(`/v1/rest/datastore/F-C0032-001?${queryString.stringify(payload)}`),
};

export default apis;