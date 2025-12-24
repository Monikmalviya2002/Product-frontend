import { useEffect, useState } from "react";
import axios from "axios";

export default function AddProductModal({ isOpen, onClose, editData }) {
  const isEdit = Boolean(editData);
  const API_URL = "https://product-backend-7.onrender.com";

  const [form, setForm] = useState({
    productName: "",
    productType: "",
    quantityStock: "",
    mrp: "",
    sellingPrice: "",
    brandName: "",
    status: "UNPUBLISHED", 
    exchangeEligible: "Yes",
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (editData) {
      setForm({
        productName: editData.productName || "",
        productType: editData.productType || "",
        quantityStock: editData.quantityStock || "",
        mrp: editData.mrp || "",
        sellingPrice: editData.sellingPrice || "",
        brandName: editData.brandName || "",
        status: editData.status || "UNPUBLISHED",
        exchangeEligible: editData.exchangeEligible ? "Yes" : "No",
        images: [],
      });
      setExistingImages(editData.images || []);
    }
  }, [editData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setForm({ ...form, images: Array.from(e.target.files) });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    
  
    Object.entries(form).forEach(([key, val]) => {
      if (key !== "images") {
       
        const value = key === "exchangeEligible" ? val === "Yes" : val;
        payload.append(key, value);
      }
    });

    
    form.images.forEach((img) => payload.append("images", img));

    try {
      const url = isEdit ? `${API_URL}/api/update/${editData._id}` : `${API_URL}/api/create`;
      await axios.post(url, payload, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      onClose(true);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded-lg flex flex-col shadow-2xl">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="font-bold text-gray-800">{isEdit ? "Edit Product" : "Add Product"}</h2>
          <button onClick={() => onClose(false)} className="text-gray-400 hover:text-black transition-colors">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-4 space-y-4 text-sm">
          <Input label="Product Name" name="productName" value={form.productName} onChange={handleChange} />
          <Select label="Product Type" name="productType" value={form.productType} onChange={handleChange} options={["Foods","Electronics","Cloths","Beauty Product","Others"]} />
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="Stock" type="number" name="quantityStock" value={form.quantityStock} onChange={handleChange} />
            <Input label="MRP" type="number" name="mrp" value={form.mrp} onChange={handleChange} />
          </div>

          <Input label="Selling Price" type="number" name="sellingPrice" value={form.sellingPrice} onChange={handleChange} />
          <Input label="Brand Name" name="brandName" value={form.brandName} onChange={handleChange} />
          
         
          <Select 
            label="Product Status" 
            name="status" 
            value={form.status} 
            onChange={handleChange} 
            options={["PUBLISHED", "UNPUBLISHED"]} 
          />

          <Select label="Exchange Eligible" name="exchangeEligible" value={form.exchangeEligible} onChange={handleChange} options={["Yes","No"]} />

          <div>
            <label className="block mb-1 text-gray-600 font-medium">Product Images</label>
            <input type="file" multiple accept="image/*" name="images" onChange={handleChange} className="w-full border rounded-md px-3 py-2 border-gray-300" />
            
            <div className="flex gap-2 mt-3 flex-wrap">
              {existingImages.map((img, i) => (
                <img key={`ex-${i}`} src={`${API_URL}/${img.replace(/\\/g, '/')}`} className="w-14 h-14 object-cover border rounded border-gray-200" />
              ))}
              {form.images.map((file, i) => (
                <img key={`new-${i}`} src={URL.createObjectURL(file)} className="w-14 h-14 object-cover border rounded border-blue-400" />
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded font-bold uppercase transition-all shadow-md">
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


function Input({ label, ...props }) {
  return (
    <div>
      <label className="block mb-1 text-gray-600 font-medium">{label}</label>
      <input {...props} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all" />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block mb-1 text-gray-600 font-medium">{label}</label>
      <select {...props} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all">
        <option value="">Select</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}