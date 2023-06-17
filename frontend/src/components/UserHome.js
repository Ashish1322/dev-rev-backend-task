import React from "react";
import Flights from "./home-components/Flights";
import Navbar from "./home-components/Navbar";
import SearchBar from "./home-components/SearchBar";
export default function UserHome() {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <Flights />
    </div>
  );
}
