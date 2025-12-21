import { AuthControllerApi, ArtistControllerApi, UserControllerApi, ConcertControllerApi, DashboardControllerApi, Configuration } from "~/api";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAccessToken, getRefreshToken, getRememberMeToken, setAccessToken, setRefreshToken, setRememberMeToken, clearTokens } from "./token-storage";

interface WindowWithEnv extends Window {
  ENV?: {
    API_BASE_URL?: string;
  };
}

const basePath = typeof window !== "undefined" 
  ? (window as unknown as WindowWithEnv).ENV?.API_BASE_URL || "http://localhost:8080"
  : "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: basePath,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: string | null) => void;
  reject: (error?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken() || getRememberMeToken();
        
        if (refreshToken) {
          const response = await axios.post(
            `${basePath}/api/auth/refresh`,
            { refreshToken },
            { headers: { "Content-Type": "application/json" } }
          );

          const { accessToken, refreshToken: newRefreshToken, rememberMeToken: newRememberMeToken } = response.data;

          if (accessToken) {
            setAccessToken(accessToken);

            if (newRefreshToken) {
              setRefreshToken(newRefreshToken);
            }

            if (newRememberMeToken) {
              setRememberMeToken(newRememberMeToken);
            }

            processQueue(null, accessToken);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            isRefreshing = false;
            return axiosInstance(originalRequest);
          }
        }
      } catch (refreshError) {
        processQueue(refreshError);
        isRefreshing = false;
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.replace("/login");
        }
        return Promise.reject(refreshError);
      }
    }
    if (error.response?.status === 401) {
      const refreshToken = getRefreshToken() || getRememberMeToken();
      if (!refreshToken) {
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.replace("/login");
        }
      }
    }

    isRefreshing = false;
    return Promise.reject(error);
  }
);

const configuration = new Configuration({
  basePath,
  baseOptions: {
    axios: axiosInstance,
  },
});

export const authApi = new AuthControllerApi(configuration, basePath, axiosInstance);
export const artistApi = new ArtistControllerApi(configuration, basePath, axiosInstance);
export const userApi = new UserControllerApi(configuration, basePath, axiosInstance);
export const concertApi = new ConcertControllerApi(configuration, basePath, axiosInstance);
export const dashboardApi = new DashboardControllerApi(configuration, basePath, axiosInstance);
