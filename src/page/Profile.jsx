import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { updateUser } from "../utils/api";

export default function Profile() {
  const { state, dispatch } = useAppContext();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      username: state.user.username,
      email: state.user.email,
    },
  });
  const { errors, isSubmitting } = formState;
  async function onSubmit(data) {
    console.log(data);

    // const result = await updateUser(data);
  }

  return (
    <div className="text-center mt-10 max-w-lg mx-auto">
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
            className="bg-slate-200 focus:border-emerald-600 border  w-full rounded-md mb-5 px-2 text-md py-3"
            type="text"
            {...register("email", { required: "Please enter your email" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            className="bg-slate-200 focus:border-emerald-600 border  w-full rounded-md mb-5 px-2 text-md py-3"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Please Enter your password",
            })}
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
          to="/register"
          className="text-red-700 font-semibold hover:bg-red-600 hover:text-white px-3 py-2 rounded-md"
        >
          Delete Account
        </button>
        <button className="text-red-700 font-semibold hover:bg-red-600 hover:text-white px-3 py-2 rounded-md">
          Sign Out
        </button>
      </div>
    </div>
  );
}
