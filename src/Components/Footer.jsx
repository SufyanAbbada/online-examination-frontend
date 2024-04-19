import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Authentication/userSlice";

function Footer(props) {
  const loggedInUser = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
    sessionStorage.removeItem("token");
  };

  return (
    <div>
      <p>
        Links:
        {!loggedInUser ? (
          <>
            <a href="/signup">Register</a>
            <a href="/login">Login</a>
          </>
        ) : (
          <button onClick={signOut}>Logout</button>
        )}
        <a href="/admin">Admin</a>
      </p>
    </div>
  );
}

export default Footer;
