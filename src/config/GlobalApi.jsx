const BASE_URL = "https://places.googleapis.com/v1/places:searchText";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API,
    "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.photoReferences",
  },
};


export const getPlaceDetails = async (data) => {
  return await axios.post(BASE_URL, data, config);
};
