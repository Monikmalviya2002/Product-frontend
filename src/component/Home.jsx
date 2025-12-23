import { useState } from "react";
import ProductTabs from "./ProductTabs";

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
          <div className="text-4xl mb-4">📦</div>
          <p className="text-sm text-gray-500">
            No published products yet.
          </p>
        </div>
      )}

      {activeTab === "unpublished" && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="text-4xl mb-4">🕒</div>
          <p className="text-sm text-gray-500">
            No unpublished products.
          </p>
        </div>
      )}
    </div>
  );
}
