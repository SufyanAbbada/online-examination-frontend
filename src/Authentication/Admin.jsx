import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Admin() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [nonApprovedUsers, setNonApprovedUsers] = useState([]);

  const fetchUsers = useCallback(() => {
    if (sessionStorage.getItem("token") && user.role === "admin") {
      try {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/awaiting-approval`, {
          method: "GET",
          headers: {
            token: sessionStorage.getItem("token"),
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setNonApprovedUsers(data.response);
          });
      } catch (error) {
        console.log("Error: ", error.message, "occurred.");
      }
    } else {
      toast("You need Admin permission to visit this page");
      navigate("/");
    }
  }, [navigate, user.role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDecision = (userId, decision) => {
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          userId,
          decision,
        }),
      }).then((response) => {
        fetchUsers();
        if (response.status === 202)
          toast("User Approved and added in the system");
        else toast("User Disapproved and removed from the system");
      });
    } catch (error) {
      console.log("Error: ", error.message, "occurred.");
    }
  };

  return (
    <div className="bg-authorized h-[100vh] flex items-center flex-col">
      <h1>Admin Page</h1>
      {nonApprovedUsers.length > 0 ? (
        <>
          <h2>
            These are some new resources trying to get registered in the system
          </h2>
          <table>
            <thead>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </thead>
            <tbody>
              {nonApprovedUsers.map((user) => {
                return (
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={(e) => handleDecision(user._id, true)}>
                        Approve
                      </button>
                      <button onClick={(e) => handleDecision(user._id, false)}>
                        Disapprove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <h2>There are no users whose request is pending to be approved</h2>
      )}
    </div>
  );
}

export default Admin;
