import React from "react";
import Place from "../../assets/place.jpg";
import JSON5 from "json5";
import { Link } from "react-router-dom";

const Hotel = ({ trip }) => {
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

  if (!tripData?.hotels) {
    return <p className="text-center text-gray-500">No hotel data available.</p>;
  }

  return (
    <div className="min-h-screen py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Hotel Recommendations
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
        {tripData.hotels.map((hotel, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${hotel.name},${hotel.address}`}
            target="_blank"
            key={index}
            className="block transform transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl">
              <img
                src={Place}
                alt={hotel.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{hotel.name}</h2>
                <p className="text-sm text-gray-600">📍 {hotel.address}</p>
                <p className="text-lg text-gray-700 mt-2">💲 {hotel.priceRange}</p>
                <p className="text-sm text-yellow-500 mt-1">⭐ {hotel.rating}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotel;
