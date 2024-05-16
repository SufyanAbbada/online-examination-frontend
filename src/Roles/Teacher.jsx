import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Teacher() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role === "") {
      toast("You need Teacher Privileges to access this page");
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="bg-authorized h-[100vh] flex items-center flex-col">
      <h1>Teacher's Dashboard</h1>
    </div>
  );
}

export default Teacher;
