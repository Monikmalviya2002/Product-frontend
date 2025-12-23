import { useState } from "react";
import Leftsidebar from "./Leftsidebar";
import Home from "./Home";
import Products from "./Products";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("products");

  return (
    <div className="flex h-screen bg-gray-100">
      <Leftsidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="flex-1 bg-white p-8">
        {activePage === "home" && <Home />}
        {activePage === "products" && <Products />}
      </main>
    </div>
  );
}
