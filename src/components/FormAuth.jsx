import React from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "./Form/FormInput";

const FormAuth = ({ isRegister }) => {
  return (
    <div className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-300 shadow-xl flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold mb-4">
          {isRegister ? "Register" : "Login"}
        </h4>
        {isRegister && <FormInput type="text" label="Name" name="name" />}
        <FormInput type="email" label="Email" name="email" />
        <FormInput type="password" label="Password" name="password" />
        <div className="mt-3">
          <button type="submit" className="btn btn-primary w-full">
            {isRegister ? "Register" : "Login"}
          </button>
        </div>
        {isRegister ? (
          <p className="text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="ml-2 link link-hover link-accent capitalize"
            >
              Login
            </Link>{" "}
            now.
          </p>
        ) : (
          <p className="text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="ml-2 link link-hover link-accent capitalize"
            >
              Register
            </Link>{" "}
            now.
          </p>
        )}
      </Form>
    </div>
  );
};

export default FormAuth;
