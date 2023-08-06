import axios from 'axios';

const baseUrl = 'http://localhost:8080/';

export const adminRegister = (body) => axios.post(`${baseUrl}register`, body);

export const adminLogin = (body) => axios.post(`${baseUrl}login`, body);

export const getVisitors = (headers) =>
  axios.get(`${baseUrl}visitors`, { headers });

export const addVisitors = (body, headers) =>
  axios.post(`${baseUrl}visitors`, body, { headers });
