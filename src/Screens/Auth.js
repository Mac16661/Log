import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function Auth({ user }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("auth") !== null) {
  //     navigate("/home");
  //     console.log(localStorage.getItem("auth"));
  //   }
  // }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    user.auth(id, password, (ack) => {
      localStorage.setItem("auth", JSON.stringify(ack.sea));
      console.log(ack);
      if (ack.err) {
        alert("invalid user/password");
      } else {
        if (localStorage.getItem("auth") !== "") {
          navigate("/home");
          //console.log(localStorage.getItem("auth"));
        }
      }
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    user.create(id, password, (ack) => {
      console.log(ack);
      if (ack.err) {
        alert(ack.err);
      } else {
        localStorage.setItem("auth", JSON.stringify(ack));
        if (localStorage.getItem("auth") !== "") {
          navigate("/home");
          console.log(localStorage.getItem("auth"));
        }
      }
    });
  };

  return (
    <div className="auth">
      <div className="login-form">
        <h1 className="text">Login in to Log</h1>
        <TextField
          label="User Id"
          variant="outlined"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="btn" variant="text" onClick={handleLogin}>
          Login
        </Button>
        <Button className="btn" variant="contained" onClick={handleSignUp}>
          SignUp
        </Button>
      </div>
    </div>
  );
}

export default Auth;
