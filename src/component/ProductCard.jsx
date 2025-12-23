export default function ProductCard({ product, onPublishToggle, onEdit, onDelete }) {
  const {
    productName,
    productType,
    quantityStock,
    mrp,
    sellingPrice,
    brandName,
    images,
    exchangeEligible,
    status,
  } = product;

  return (
    <div className="bg-white rounded-lg border p-4 w-[260px] shadow-sm">
      {/* Image */}
      <div className="h-25 flex items-center justify-center bg-gray-50 rounded mb-3">
        <img
          src={images?.[0] || "/placeholder.png"}
          alt={productName}
          className="max-h-full object-contain"
        />
      </div>

      {/* Info */}
      <h3 className="font-semibold text-sm mb-2">{productName}</h3>

      <div className="text-xs text-gray-600 space-y-1">
        <p>Product type : <span className="float-right">{productType}</span></p>
        <p>Quantity Stock : <span className="float-right">{quantityStock}</span></p>
        <p>MRP : <span className="float-right">₹ {mrp}</span></p>
        <p>Selling Price : <span className="float-right">₹ {sellingPrice}</span></p>
        <p>Brand Name : <span className="float-right">{brandName}</span></p>
        <p>Total Number of images : <span className="float-right">{images?.length || 0}</span></p>
        <p>
          Exchange Eligibility :
          <span className="float-right">
            {exchangeEligible ? "YES" : "NO"}
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onPublishToggle(product)}
          className={`flex-1 text-sm py-1.5 rounded ${
            status === "published"
              ? "bg-green-500 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {status === "published" ? "Unpublish" : "Publish"}
        </button>

        <button
          onClick={() => onEdit(product)}
          className="flex-1 border text-sm py-1.5 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(product._id)}
          className="border px-2 rounded text-gray-500"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
