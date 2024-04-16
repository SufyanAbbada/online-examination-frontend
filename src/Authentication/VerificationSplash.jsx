import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function VerificationSplash() {
  const [verified, setVerified] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log(location.search);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/verify${location.search}`)
      .then(async (data) => {
        if (data.status === 201) {
          toast((await data.json()).response);
          setVerified(true);
        } else {
          const errorResponse = await data.json();
          toast(errorResponse.response);
        }
      })
      .catch((e) => {
        console.log("An error occurred while sending your request");
      });
  }, [location.search]);

  return (
    <div className="bg-unauthorized h-[100vh] flex flex-col items-center justify-center">
      {verified ? (
        <>
          <h1>You are verified to the System.</h1>
          <h3>
            You can now proceed to{" "}
            <a href="/login" className="underline">
              Login.
            </a>
          </h3>
        </>
      ) : (
        <>
          <h1>You Verification request has sent to the system.</h1>
          <h3>Please Sit Tight while the system verifies you</h3>
          <p>
            In case, you don't get the mail or made a typo, you can{" "}
            <a href="/signup" className="underline">
              Sign up
            </a>{" "}
            anytime
          </p>
        </>
      )}
    </div>
  );
}

export default VerificationSplash;
