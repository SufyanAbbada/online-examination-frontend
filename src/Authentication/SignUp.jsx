import validations from "../utils/inputValidations";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles.css";

function SignUp() {
  const [name, setName] = useState("Sufyan Abbada");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("sufyan@test.com");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("test1234*");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("test1234*");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const signUp = async () => {
    if (
      await validations(
        name,
        setNameError,
        email,
        setEmailError,
        password,
        setPasswordError,
        confirmPassword,
        setConfirmPasswordError
      )
    ) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      try {
        if (response.status !== 200) {
          const error = await response.json();
          return toast(error.response);
        } else {
          const data = await response.json();
          console.log(data.response);
          toast("Successfully Registered you the system");
          return setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      } catch (err) {
        return toast("Error occurred while entertaining your request: ", err);
      }
    }
  };

  return (
    <div className="bg-unauthorized h-[100vh] flex items-center flex-col">
      <h1>Let's create your new Account</h1>
      <div className="border-image flex flex-col gap-5 p-5">
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <small id="nameError" className="text-muted block">
            {nameError}
          </small>
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailError" className="text-muted block">
            {emailError}
          </small>
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small id="passwordError" className="text-muted block">
            {passwordError}
          </small>
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <small id="confirmPasswordError" className="text-muted block">
            {confirmPasswordError}
          </small>
        </div>

        <button className="bg-teal-700 p-2 rounded-xl" onClick={signUp}>
          Let's get Signed Up
        </button>
      </div>
      <p>
        If you are already a User, You have the liberty to{" "}
        <Link className="underline" to="/login">
          Sign In
        </Link>
        .
      </p>
    </div>
  );
}

export default SignUp;
