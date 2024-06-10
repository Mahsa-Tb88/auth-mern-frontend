import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { deleteUser, signOut, updateUser } from "../utils/api";

export default function Profile() {
  const { state, dispatch } = useAppContext();
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  // console.log(state.user);
  // console.log(JSON.parse(localStorage.user));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: state.user.username,
      email: state.user.email,
    },
  });
  async function onSubmit(data) {
    const userId = state.user.id;
    const result = await updateUser(userId, data.username, data.password);
    setSuccessMessage(false);
    setError(false);
    console.log(result);
    if (result.success) {
      setSuccessMessage("Your profile updated successfully!");
      console.log(result.success);
      const { username, email, _id } = result.body;
      dispatch({
        type: "setUser",
        payload: { username, id: _id, email, isLoggedIn: true },
      });
      setSuccessMessage("Your profile updated successfullu!");
    } else {
      setError(result.message);
    }
  }

  async function signOutHandler() {
    const result = await signOut();
    if (result.success) {
      dispatch({
        type: "setUser",
        payload: { id: "", username: "", email: "", isLoggedIn: false },
      });
      navigate("/login");
    } else {
      console.log(result);
    }
  }
  async function deleteAccount() {
    if (!confirm("Are you sure for deleting your account?")) {
      return;
    }
    const id = state.user.id;
    const result = await deleteUser(id);
    if (result.success) {
      navigate("/login");
    } else {
      setError(result.message);
    }
  }
  return (
    <div className="text-center mt-10 max-w-lg mx-auto">
      {successMessage && (
        <div className="my-10">
          <h3 className="bg-emerald-700 text-white py-3 px-2 rounded-md font-bold text-lg">
            {successMessage}
          </h3>
        </div>
      )}
      {error && (
        <div className="my-10">
          <h3 className="bg-red-800 text-white py-3 px-2 rounded-md font-bold">
            {error}
          </h3>
        </div>
      )}
      <h1 className="text-4xl font-bold mb-10">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="bg-slate-200 focus:border-emerald-600 border  w-full rounded-md mb-5 px-2 text-md py-3"
            type="text"
            {...register("username", {
              required: "Please enter your username",
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <input
            className="bg-slate-200 opacity-40 focus:border-emerald-600 border  w-full rounded-md mb-5 px-2 text-md py-3"
            type="text"
            {...register("email")}
            disabled
          />
        </div>
        <div>
          <input
            className="bg-slate-200 focus:border-emerald-600 border  w-full rounded-md mb-5 px-2 text-md py-3"
            type="password"
            placeholder="password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="flex flex-col justify-between items-center">
          <button className="bg-emerald-600 mb-4 text-white w-full rounded-md py-3 text-lg font-semibold hover:bg-emerald-800">
            Upadte
          </button>
        </div>
      </form>
      <div className=" mt-2 flex justify-between items-center">
        <button
          to="/login"
          className="text-red-700 font-semibold hover:bg-red-600 hover:text-white px-3 py-2 rounded-md"
          onClick={deleteAccount}
        >
          Delete Account
        </button>
        <button
          className="text-red-700 font-semibold hover:bg-red-600 hover:text-white px-3 py-2 rounded-md"
          onClick={signOutHandler}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
