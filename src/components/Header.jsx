import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

export default function Header() {
  const { state, dispatch } = useAppContext();
  return (
    <div className="bg-emerald-500 text-white flex justify-between px-5 py-4">
      <h3 className="font-bold text-xl">Auth App</h3>
      <div>
        <Link
          className="text-lg font-semibold hover:bg-white hover:text-emerald-500 px-2 py-1 rounded-md mx-5"
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-lg font-semibold hover:bg-white hover:text-emerald-500 px-2 py-1 rounded-md mx-5"
          to="about"
        >
          About
        </Link>
        {state.user.isLoggedIn ? (
          <Link
            to="profile"
            className="text-lg font-semibold hover:bg-white hover:text-emerald-500 px-2 py-1 rounded-md ml-5"
          >
            Profile
          </Link>
        ) : (
          <Link
            className="text-lg font-semibold hover:bg-white hover:text-emerald-500 px-2 py-1 rounded-md ml-5"
            to="login"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
