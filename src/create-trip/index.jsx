import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, budget, stay } from "@/constants/info";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useToast } from "@/hooks/use-toast";
import Logo from "../assets/t.jpg";
import { chatSession } from "@/config/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/Firebase";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [form, setForm] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate= useNavigate();

  const handleInputChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  const login = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onError: (err) => console.log(err),
  });
  const GenTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!form.days || !form.location || !form.budget || !form.stay) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        type: "error",
      });
      return;
    }
    setLoading(true);
    const PROMPT = AI_PROMPT.replace("{location}", form.location.label)
      .replace("{days}", form.days)
      .replace("{stay}", form.stay)
      .replace("{budget}", form.budget);
    console.log(PROMPT);

    const result = await chatSession.sendMessage(PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    saveDataToDb(result.response.text());
  };

  const saveDataToDb = async (tripData) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user.email;
      const docId = Date.now().toString();
      await setDoc(doc(db, "all-trips", docId), {
        userSelection: form,
        tripData: tripData,
        userEmail: email,
        id: docId,
      });
      toast({
        title: "Success",
        description: "Trip generated successfully",
        type: "success",
      });
      navigate("/view-trip/"+docId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getUserProfile = async (tokenInfo) => {
    try {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${tokenInfo.access_token}`,
              Accept: "Application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          localStorage.setItem("user", JSON.stringify(res.data));
          setOpenDialog(false);
          toast({
            title: "Success",
            description: "User logged in successfully",
            type: "success",
          });
        });
    } catch (error) {}
  };
  return (
    <div className="px-8 mt-10 max-w-3xl mx-auto">
      {/* Header */}
      <motion.h1
        className="text-4xl font-extrabold text-center text-gray-900 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Travel Plans Tailored Just for You!
      </motion.h1>
      <motion.p
        className="text-lg text-center text-gray-600 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Provide your travel days, dream destination, and budget, and let us
        craft the perfect itinerary for you!
      </motion.p>

      {/* Form Sections */}
      <div className="mt-16 mb-10 flex flex-col gap-8">
        {/* Destination */}
        <motion.div
          className="flex flex-col gap-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-2xl font-medium text-gray-800">
            Where would you like to go?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
              placeholder: "Type your destination...",
              styles: {
                input: (provided) => ({
                  ...provided,
                  padding: "14px",
                }),
              },
            }}
          />
        </motion.div>

        {/* Days */}
        <motion.div
          className="flex flex-col gap-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-2xl font-medium text-gray-800">
            How many days are you planning to travel?
          </h2>
          <Input
            placeholder="e.g., 5"
            type="number"
            className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-500 transition"
            value={form.days}
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </motion.div>

        {/* Budget */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h2 className="text-2xl font-medium text-gray-800 mb-5">
            What’s your Budget?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {budget.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-2 cursor-pointer ${
                  form.budget === item.title
                    ? "border-[3px] border-purple-500 shadow-xl"
                    : ""
                }`}
              >
                <div className="text-5xl text-purple-500 mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stay */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h2 className="text-2xl font-medium text-gray-800 mb-5">
            How do you plan on travelling?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {stay.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("stay", item.people)}
                className={`flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-2 cursor-pointer ${
                  form.stay === item.people
                    ? "border-[3px] border-purple-500 shadow-xl"
                    : ""
                }`}
              >
                <div className="text-5xl text-purple-500 mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          className="flex items-center justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Button
            onClick={GenTrip}
            disable={loading}
            className="px-8 py-3 rounded-full font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Generate Your Trip"
            )}
          </Button>
        </motion.div>
      </div>

      {/* Improved Dialog Box */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          className="w-[95%] sm:w-[400px] md:w-[450px] p-8 bg-white rounded-2xl shadow-lg transition-all duration-300 ease-in-out"
          style={{ animation: "fadeIn 0.5s ease-in-out" }}
        >
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="text-3xl font-semibold text-gray-800"></DialogTitle>
            <DialogDescription className="mt-4 text-center text-gray-500">
              <img
                src={Logo}
                alt="WanderWise"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <p className="text-lg">
                You need to sign in to generate your personalized trip
                itinerary.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center mt-8">
            <Button
              onClick={login}
              className=" text-white rounded-lg px-8 py-2 transition duration-200 transformhover:scale-105"
            >
              Sign in With Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
