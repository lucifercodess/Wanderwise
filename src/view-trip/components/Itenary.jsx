import React from "react";
import JSON5 from "json5";
import PlaceCardItem from "./PlaceCardItem";

const Itenary = ({ trip }) => {
  let tripData = null;

  try {
    tripData = JSON5.parse(trip?.tripData);
  } catch (error) {
    return (
      <p className="text-center text-red-500">
        Unable to load trip data. Please contact support.
      </p>
    );
  }

  const itinerary = tripData?.itinerary;

  if (!itinerary) {
    return (
      <p className="text-center text-red-500">
        Itinerary data is missing or improperly formatted.
      </p>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Places to Visit
      </h2>
      <div>
        {Object.entries(itinerary).map(([day, details], index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {day}
            </h3>
            <PlaceCardItem details={details} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itenary;
