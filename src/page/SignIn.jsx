import React from "react";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { login } from "../utils/api";
import { useAppContext } from "../Context/AppContext";

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  async function onSubmit(data) {
    console.log(data);

    const result = await login(data);
    if (result.success) {
      console.log(result);
      const user = result.body.findedUser;
      localStorage.token = result.body.token;
      const newUser = {
        email: user.email,
        username: user.username,
        isLoggedIn: true,
      };
      dispatch({
        type: "setUser",
        payload: newUser,
      });
      localStorage.user = JSON.stringify({
        email: user.email,
        username: user.username,
        isLoggedIn: true,
      });
      navigate("/profile");
      console.log("yees logged in");
    } else {
      console.log(result);
    }
  }
  return (
    <div className="text-center mt-10 max-w-lg mx-auto">
      <h1 className="text-4xl font-bold mb-10">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="bg-slate-200 focus:border-emerald-600 border  w-full rounded-md mb-5 px-2 text-md py-3"
            placeholder="email"
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
            Sign In
          </button>
          <button className="bg-red-700 text-white hover:bg-red-800 w-full rounded-md py-3 font-semibold text-lg">
            Continue with google
          </button>
        </div>
      </form>
      <div className=" mt-2 flex justify-start items-center">
        <p className="text-slate-800 pr-2">Don't have an account?</p>
        <Link
          to="/register"
          className="text-emerald-700 font-semibold hover:bg-emerald-600 hover:text-white px-3 py-2 rounded-md"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
