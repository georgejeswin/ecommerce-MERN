import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;
const { Item } = Menu;

const Header = () => {
  const [current, setcurrent] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const handleClick = (e) => {
    setcurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="login" className="float-right" icon={<UserOutlined />}>
        <Link to="login">Login</Link>
      </Item>
      <Item key="register" className="float-right" icon={<UserAddOutlined />}>
        <Link to="register">Register</Link>
      </Item>

      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item icon={<LogoutOutlined />} onClick={logout}>
          Logout{" "}
        </Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
