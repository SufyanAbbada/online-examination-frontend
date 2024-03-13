const getEmailFromToken = async (token) => {
  return await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/decrypt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
};

export default getEmailFromToken;
