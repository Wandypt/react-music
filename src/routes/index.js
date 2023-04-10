import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "../application/Home";
import Recommend from "../application/Recommend";
import Singers from "../application/Singers";
import Rank from "../application/Rank";

export default function MyRouter(props) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/rank" element={<Rank />}></Route>
          <Route path="/recommend" element={<Recommend />}></Route>
          <Route path="/singers" element={<Singers />}></Route>
        </Route>
      </Routes>
    </>
  );
}
