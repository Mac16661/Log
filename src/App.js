import React from "react";
import Gun from "gun";
// import "gun/lib/open";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "gun/sea";
import Auth from "./Screens/Auth";
import Home from "./Screens/Home";

//TODO: server is running at "http://localhost:8080/gun"

function App() {
  const gun = Gun("http://localhost:8080/gun");
  const user = gun.user();
  //.recall({ sessionStorage: true });

  return (
    <div className="bg-black ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth user={user} />} />
          <Route path="/home" element={<Home gun={gun} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
