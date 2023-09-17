import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Home() {
  return (
    <div>
      <Header />
      <div className="content">
        <h1>Home</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          distinctio sit suscipit consequuntur tempora quaerat aut accusamus,
          possimus, eum, architecto consectetur ab ullam? Rem, est accusantium.
          Quo ipsam beatae explicabo nobis nulla recusandae cumque fugiat
          ducimus atque perferendis molestias, suscipit quam sunt inventore
          saepe, reprehenderit at nostrum voluptas mollitia laudantium.
        </p>
        <Link to="/register">Register</Link>
        <br />
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Home;
