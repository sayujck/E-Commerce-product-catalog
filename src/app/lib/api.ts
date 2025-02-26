export const API_BASE_URL = "https://fakestoreapi.com";

// get all products
export const fetchAllProducts = async () => {
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// get details by ID
export const fetchProductDetails = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product details");
  return res.json();
};

// get products by category
export const fetchProductsByCategory = async (category: string) => {
  const res = await fetch(`${API_BASE_URL}/products/category/${category}`);
  if (!res.ok) throw new Error(`Failed to fetch products in ${category}`);
  return res.json();
};
