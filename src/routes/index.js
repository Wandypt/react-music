import { lazy, Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import Home from "../application/Home";
const Recommend = lazy(() => import("../application/Recommend"));

const Singers = lazy(() => import("../application/Singers"));
const Rank = lazy(() => import("../application/Rank"));
const Album = lazy(() => import("../application/Album"));
const Singer = lazy(() => import("../application/Singer"));
const Search = lazy(() => import("../application/Search"));
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
          <Route path="/search" element={<Search />}></Route>
        </Route>
      </Routes>
    </>
  );
}
