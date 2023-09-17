import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

import env from "react-dotenv"

function Login() {

  

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, SetUser] = useState("");
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:4000/login", { username, password })
      //.post("https://auth-server-syyz.onrender.com/login", { username, password })
      
      .then((responce) => {
        
        if(responce.data.username){
          SetUser(responce.data.username);
          console.log(responce.data.username)
          
          
        }
        
        else{
          alert(responce.data)
        }
        
      })
      .catch((error) => {
        console.log(error);
      });

    
  }

  
useEffect(()=>{
  if(user!==""){
    alert(`hi ${user}`)
    console.log(user)
    sessionStorage.setItem("users",JSON.stringify(user))
    navigate('/home')
    window.location.reload()
    
  }
})
  

  return (
    <div>
      <Header/>
      <div className="content">
      <h1>Login</h1>
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
          <button>Login</button>
        </div>
      </form>
      </div>
      

   
    </div>
  );
}

export default Login;
