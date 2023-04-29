import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "../application/Home";
import Recommend from "../application/Recommend";
import Singers from "../application/Singers";
import Rank from "../application/Rank";
import Album from "../application/Album";
import Singer from "../application/Singer";
export default function MyRouter(props) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/rank" element={<Rank />}>
            <Route path="/rank/:id" element={<Album />}></Route>
          </Route>
          <Route path="/recommend" element={<Recommend />}>
            <Route path="/recommend/:id" element={<Album />}></Route>
          </Route>
          <Route path="/singers" element={<Singers />}>
            <Route path="/singers/:id" element={<Singer />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
