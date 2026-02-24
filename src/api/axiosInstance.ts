import axios from "axios";
import { store } from "../services/store";
import { setIsAuth } from "../features/user/userSlice";

import type { FailedRequst } from "./types";
import { refreshTokenApi } from "./token/request";
import { tokenManager } from "../features/tokens/tokenManages";

export const BASE_URL = "https://easydev.club/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {

    const accessToken = tokenManager.getAccessToken()

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;

let failedQueue: FailedRequst[] = [];

const processQueue = (error: unknown = null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url === "/auth/refresh") {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string | null>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = tokenManager.getRefreshToken()
      if (!refreshToken) throw new Error("No refresh token");
      const { accessToken, refreshToken: newRefresh } = await refreshTokenApi({
        refreshToken,
      });
      tokenManager.setAccessToken(accessToken)
      if (newRefresh) {
        tokenManager.setRefreshToken(newRefresh)
      }

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      processQueue(null, accessToken);
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      tokenManager.clearTokens()
      store.dispatch(setIsAuth(false));
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
