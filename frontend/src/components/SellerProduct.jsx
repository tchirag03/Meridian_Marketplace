import { Plus } from "lucide-react";

export default function SellerProducts() {
  // Dummy products
  const products = [
    {
      id: 1,
      name: "Handmade Vase",
      price: "$45",
      category: "Home Decor",
    },
    {
      id: 2,
      name: "Woven Basket",
      price: "$30",
      category: "Handicrafts",
    },
    {
      id: 3,
      name: "Organic Spices Pack",
      price: "$20",
      category: "Food",
    },
    {
      id: 4,
      name: "Wooden Chair",
      price: "$120",
      category: "Furniture",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#0D1B2A]">Your Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => console.log("Product clicked:", product.id)}
            className="bg-[#F5F7FA] rounded-lg shadow hover:shadow-lg transition cursor-pointer p-4 flex flex-col"
          >
            <h3 className="text-lg font-semibold text-[#1E88E5] mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p className="mt-auto text-lg font-bold text-[#00897B]">
              {product.price}
            </p>
          </div>
        ))}

        {/* Add Product Card */}
        <div
          onClick={() => console.log("Add product clicked")}
          className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-[#1E88E5] hover:bg-[#F5F7FA] transition cursor-pointer"
        >
          <Plus size={40} className="text-gray-500 hover:text-[#1E88E5]" />
        </div>
      </div>
    </div>
  );
}
