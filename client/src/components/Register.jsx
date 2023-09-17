import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
function Register({ user }) {
  const [username, setUserName] = useState("");

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:4000/register", { username, password })
      //.post("https://auth-server-syyz.onrender.com/register", { username, password })

      .then((responce) => {
        console.log(responce);
        if (responce.data.message) {
          alert(responce.data.message);
        } else {
          alert("User Created");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Header />
      <div className="content">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="text"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <div>
            <button>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
