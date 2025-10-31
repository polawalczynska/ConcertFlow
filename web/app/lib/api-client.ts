import { AuthControllerApi, Configuration } from "~/api";

const configuration = new Configuration({
  basePath: typeof window !== "undefined" 
    ? (window as any).ENV?.API_BASE_URL || "http://localhost:8080"
    : "http://localhost:8080",
});

export const authApi = new AuthControllerApi(configuration);

