import axios from "axios";

export function setupAPIClient(ctx = undefined) {
  if (process.browser) {
    const token = localStorage.getItem("token");

    const api = axios.create({
      baseURL: "http://localhost:5000",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return api;
  }
}
