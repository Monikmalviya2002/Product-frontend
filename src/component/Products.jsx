import { useEffect, useState } from "react";
import axios from "axios";
import AddProductModal from "./AddProductModal";
import { Trash2 } from "lucide-react"; 

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const API_URL = "http://localhost:7777";

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`, { withCredentials: true });
      setProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/api/delete/${id}`, { withCredentials: true });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const toggleStatus = async (product) => {
    try {
      await axios.post(`${API_URL}/api/update/${product._id}`, { ...product, status: product.status === "PUBLISHED" ? "UNPUBLISHED" : "PUBLISHED" }, { withCredentials: true });
      fetchProducts();
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <h1 className="text-xl font-bold text-gray-800">Products</h1>
        <button
          className="text-black-500 font-semibold flex items-center gap-1 hover:text-black-600 transition-all"
          onClick={() => { setEditProduct(null); setIsModalOpen(true); }}
        >
          <span className="text-xl">+</span> Add Products
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((p) => (
          <div key={p._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
            <div className="h-30 flex items-center justify-center bg-white p-2">
              <img 
                src={p.images && p.images.length > 0 ? `${API_URL}/${p.images[0].replace(/\\/g, '/')}` : "https://via.placeholder.com/150"} 
                alt={p.productName} 
                className="max-h-full max-w-full object-contain"
                onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
              />
            </div>

            <div className="p-4 border-t border-gray-100 flex-1">
              <h3 className="font-bold text-gray-800 text-lg mb-3">{p.productName}</h3>
              
              <div className="space-y-1.5 text-xs text-gray-500">
                <div className="flex justify-between"><span>Product type -</span> <span className="text-gray-900 font-medium">{p.productType}</span></div>
                <div className="flex justify-between"><span>Quantity Stock -</span> <span className="text-gray-900 font-medium">{p.quantityStock}</span></div>
                <div className="flex justify-between font-semibold"><span>MRP -</span> <span className="text-gray-900">₹ {p.mrp}</span></div>
                <div className="flex justify-between font-semibold"><span>Selling Price -</span> <span className="text-gray-900">₹ {p.sellingPrice}</span></div>
                <div className="flex justify-between"><span>Brand Name -</span> <span className="text-gray-900 font-medium">{p.brandName}</span></div>
                <div className="flex justify-between uppercase"><span>Exchange -</span> <span className="text-gray-900 font-bold">{p.exchangeEligible ? "YES" : "NO"}</span></div>
              </div>

              <div className="mt-5 flex gap-2">
                <button 
                  onClick={() => toggleStatus(p)}
                  className={`flex-1 py-2 rounded text-white text-xs font-bold uppercase transition-colors ${p.status === 'PUBLISHED' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {p.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                </button>
                <button 
                  onClick={() => { setEditProduct(p); setIsModalOpen(true); }}
                  className="border border-gray-300 px-4 py-2 rounded text-xs font-semibold hover:bg-gray-50 transition-colors"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteProduct(p._id)}
                  className="border border-gray-300 p-2 rounded text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <AddProductModal
          isOpen={isModalOpen}
          onClose={(refresh) => { setIsModalOpen(false); if (refresh) fetchProducts(); }}
          editData={editProduct}
        />
      )}
    </div>
  );
}
