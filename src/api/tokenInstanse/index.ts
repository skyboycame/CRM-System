import axios from "axios";
import { BASE_URL } from "../axiosInstance";

export const refreshClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
