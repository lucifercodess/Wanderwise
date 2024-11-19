import React from "react";
import { motion } from "framer-motion";
import Logo from "../../assets/t.jpg";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const Header = () => {
  const user = localStorage.getItem("user");

  const imageClick = () => {};

  const login = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onError: (err) => console.log(err),
  });
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
         
          toast({
            title: "Success",
            description: "User logged in successfully",
            type: "success",
          });
        });
       window.location.reload();
    } catch (error) {}
  };
  return (
    <motion.div
      className="p-3 px-5 shadow-sm flex items-center justify-between bg-white sticky top-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div className="shadow-lg cursor-pointer rounded-full hover:shadow-2xl">
        <img
          onClick={imageClick} // Call imageClick function on click
          src={Logo}
          alt="logo"
          className="w-[60px] h-[60px] rounded-full"
        />
      </motion.div>
      {!user ? (
        <button onClick = {login}className="text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-all font-bold shadow-lg">
          SIGN IN
        </button>
      ) : (
        ""
      )}
    </motion.div>
  );
};

export default Header;
