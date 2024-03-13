const validations = async (
  name = null,
  setNameError = () => {},
  email,
  setEmailError,
  password,
  setPasswordError,
  confirmPassword = null,
  setConfirmPasswordError = () => {}
) => {
  let count = 0;

  if (name != null) {
    if (!name) {
      count++;
      setNameError("Name can't be Empty");
    } else if (!name.match(/^[A-Za-z\s]+$/)) {
      count++;
      setNameError(
        "I haven't heard of a name with Special characters or Numbers"
      );
    } else if (name.length < 3 || name.length > 40) {
      count++;
      setNameError("How can I call you with this name. Please fix its length");
    } else {
      setNameError("");
    }
  }

  if (!email) {
    count++;
    setEmailError("Email is required");
  } else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    count++;
    setEmailError("Please check the Email format");
  } else {
    setEmailError("");
  }

  if (password.length < 3 || password.length > 10) {
    count++;
    setPasswordError(
      "Password's length must be greater than 3 and less than 10"
    );
  } else if (
    !password.match(
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/
    )
  ) {
    count++;
    setPasswordError(
      "Password should be strong with Numbers, Alphabets and some Special characters"
    );
  } else {
    setPasswordError("");
  }

  if (confirmPassword != null) {
    if (password !== confirmPassword) {
      count++;
      setConfirmPasswordError(
        "Confirm Password should exactly match the Password"
      );
    } else {
      setConfirmPasswordError("");
    }
  }

  if (count === 0) {
    return true;
  } else {
    return false;
  }
};

export default validations;
