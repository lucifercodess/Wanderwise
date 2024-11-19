import React, { useEffect } from "react";
import Place from "../../assets/place.jpg";
import { MdOutlineIosShare } from "react-icons/md";
import { getPlaceDetails } from "@/config/GlobalApi";

const Info = ({ trip }) => {
  const getPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label || "Thailand",
      };
  
      console.log("Request Payload:", data);
  
      const result = await getPlaceDetails(data);
      console.log("API Response:", result.data);
    } catch (error) {
      console.error("Error fetching place details:", error.response?.data || error.message);
      if (error.response?.data) {
        console.error("Full error details:", JSON.stringify(error.response?.data, null, 2));

      }
    }
  };
  

  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      getPlacePhoto();
    } else {
      console.warn("Location label is missing in trip data.");
    }
  }, [trip]);

  return (
    <div>
      <img
        src={Place}
        alt="Trip"
        className="w-full rounded-2xl object-cover h-[300px] shadow-md"
      />

      <div className="flex items-center justify-between my-6">
        <div>
          <h1 className="font-extrabold text-3xl text-gray-800">
            {trip?.userSelection?.location?.label}
          </h1>
          <div className="flex gap-4 mt-2 text-gray-600">
            <span className="p-2 bg-gray-100 rounded-lg">
              📅 {trip?.userSelection?.days} Days
            </span>
            <span className="p-2 bg-gray-100 rounded-lg">
              💰 Budget - {trip?.userSelection?.budget}
            </span>
            <span className="p-2 bg-gray-100 rounded-lg">
              👫 Travellers - {trip?.userSelection?.stay}
            </span>
          </div>
        </div>

        <button className="bg-gray-200 p-4 rounded-lg text-gray-700 hover:bg-gray-300 transition-all duration-300">
          <MdOutlineIosShare size={24} />
        </button>
      </div>
    </div>
  );
};

export default Info;
