import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    console.log(process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT);
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setLoading(false);
        toast.success(`Reset Link sent to ${email}`);
        setEmail("");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log(error);
      });
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              placeholder="Please enter your Email"
            />
            <br />
            <Button
              onClick={handleSubmit}
              disabled={!email}
              type="primary"
              shape="round"
              size="large"
            >
              Submit
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
