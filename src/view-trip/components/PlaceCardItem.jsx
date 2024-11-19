import React from "react";
import Place from "../../assets/place.jpg";

const PlaceCardItem = ({ details }) => {
  return (
    <div className="shadow-lg border p-4 mt-4 rounded-xl flex gap-6 items-center bg-white transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={details.imageUrl}
        alt="Place"
        className="w-[100px] h-[100px] rounded-xl object-cover"
      />

      <div>
        <h2 className="text-xl font-bold text-gray-800">{details.place}</h2>
        <p className="mt-2 text-gray-600">{details.details}</p>
        <div className="flex mt-3 text-md">
          <h2 className="font-medium text-gray-700 mr-2">Spends:</h2>
          <span>{details.ticketPrice}</span>
        </div>
        <h2 className="text-sm text-gray-500 mt-1">
          Accessibility: {details.travelTime}
        </h2>
      </div>
    </div>
  );
};

export default PlaceCardItem;
