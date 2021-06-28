import { create } from "apisauce";
import { ACCESS_TOKEN } from "../config";

/**
 * API client. apisauce instace for all requests
 */
const API = create({
  baseURL: "https://api.dropboxapi.com/2/files/",
  headers: {
    "Content-Type": "application/json",
  },
});

API.setHeader("Authorization", `Bearer ${ACCESS_TOKEN}`);

export default API;
