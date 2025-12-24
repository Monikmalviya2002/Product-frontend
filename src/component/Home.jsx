import { useState } from "react";
import ProductTabs from "./ProductTabs";
import pic1 from "../assets/image2.png";
import pic2 from "../assets/image3.png";

export default function Products() {
  const [activeTab, setActiveTab] = useState("published");

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Products
      </h2>

      <ProductTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "published" && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="flex justify-center items-center mb-4">
            <img
              src={pic1}
              alt="home"
              className="w-full max-w-md h-60 object-cover rounded-lg"
            />
          </div>
        </div>
      )}

      {activeTab === "unpublished" && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="flex justify-center items-center mb-4">
            <img
              src={pic2}
              alt="home"
              className="w-full max-w-md h-60 object-cover rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
