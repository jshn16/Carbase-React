import "./App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  HashRouter,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
//Components
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Cars from "./components/Cars";
import Customer from "./components/Customer";


function userData() {
  const data = sessionStorage.getItem("users");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

function App() {
  const [user, setUser] = useState(userData());
  



  return (
    <HashRouter>
      {user.length === 0 ? (
        <Routes>
          
          <Route path="/" element={<Home user={user} />}></Route>
          <Route path="/cars" element={<Home user={user} />}></Route>
        </Routes>
      ) : (
        
        <Routes>
          <Route path="/" element={<Home user={user} />}></Route>
          <Route path="/cars" element={<Cars user={user} />}></Route>
          <Route path="/customer" element={<Customer />}></Route>
        </Routes>
      )}
     

      <Routes>
        
        <Route path="/home" element={<Home user={user} />}></Route>
      </Routes>

      <Routes>
        <Route path="/register" element={<Register user={user} />}></Route>
      </Routes>

      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
