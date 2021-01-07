import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Space } from "antd";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [email, setEmail] = useState("georgejeswin2000@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGEED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  const handelGoogleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        history.push("/");

        dispatch({
          type: "LOGGEED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        required
        className="form-control"
        autoFocus
        value={email}
        placeholder="Enter your Email"
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        placeholder="Enter your Password"
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );
  return (
    <div className="container col-md-9 offset-md-3 p-5">
      <div className="row">
        <div className="col-md-6 col-offset-md-3">
          {loading ? (
            <Space size="middle">
              <Spin size="large" />
            </Space>
          ) : (
            <>
              <h2>Login</h2>
              {loginForm()}
              <Button
                onClick={handelGoogleLogin}
                type="danger"
                block
                shape="round"
                icon={<GoogleOutlined />}
                size="large"
              >
                Login with Google
              </Button>
              <Link
                to="/forgot/password"
                className="float-right text-danger mt-3"
              >
                Forgot Password
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
