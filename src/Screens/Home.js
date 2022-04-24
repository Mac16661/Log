import "gun/lib/open";
import React from "react";
import Nav from "../components/Nav";
import NewPost from "../components/NewPost";
import Feed from "../components/Feed";
import "./Home.css";

function Home({ gun }) {
  // const key = JSON.parse(localStorage.getItem("auth"));

  return (
    <div className="home">
      <Nav gun={gun} />
      <NewPost gun={gun} />
      <Feed gun={gun} />
    </div>
  );
}

export default Home;
