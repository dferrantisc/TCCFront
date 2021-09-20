import axios from "axios";
import { SERVER_IP } from "config";

export function setupAPIClient(ctx = undefined) {
  if (process.browser) {
    const token = localStorage.getItem("token");

    const api = axios.create({
      baseURL: SERVER_IP,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return api;
  }
}
