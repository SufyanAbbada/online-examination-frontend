import validations from "../utils/inputValidations";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getEmailFromToken from "../utils/getEmailFromToken";

function Login() {
  const [email, setEmail] = useState("sufyan@test.com");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("test1234*");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    if (
      await validations(
        null,
        () => {},
        email,
        setEmailError,
        password,
        setPasswordError,
        null,
        () => {}
      )
    ) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      try {
        if (response.status !== 200) {
          const error = await response.json();
          return toast(error.response);
        } else {
          const data = await response.json();
          sessionStorage.setItem("token", data.response);
          toast("Signed In");
          return setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (err) {
        return toast("Error occurred while entertaining your request: ", err);
      }
    }
  };

  return (
    <div className="bg-unauthorized h-[100vh] flex items-center flex-col">
      <h1>Ok, Let's get you in the system</h1>
      <div className="border-image flex flex-col gap-5 p-5">
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
        <button className="bg-fuchsia-500 p-2 rounded-xl" onClick={login}>
          Login
        </button>
      </div>
      <p>
        New to the Site, and need to Sign Up,{" "}
        <Link to={"/signup"} className="underline">
          Lets's go.
        </Link>
      </p>
    </div>
  );
}

export default Login;
