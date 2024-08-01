import axios from "axios";
const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjJlNzgyZDU2MzBmYzVjYjYwZjM3ZCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MTA0MTc4ODksImV4cCI6MTcxMDY3NzA4OX0.rbDkIqRP4AXDV-ohe5om2GbuCwZWYTUcLdNzPFYmSWI";
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}`},
});