import axios from "axios";

// ------------------------------------------------

export const vimeoHttpClient = axios.create({
  baseURL: "https://api.vimeo.com",
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_VIMEO_API_KEY}`,
  },
  params: {
    sort: "alphabetical", // Sorting videos alphabetically
  },
});


// ------------------------------------------------


export const httpClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
