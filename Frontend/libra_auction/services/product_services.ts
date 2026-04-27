import { ProductCreateRequestType } from "@/types/product_create_request_type";

export const productApi = {
  // Mock upload ảnh
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    // const res = await fetch('/api/images/upload', { method: 'POST', body: formData });
    // return res.json();
    return "https://via.placeholder.com/150"; // Mock response
  },

  createProduct: async (data: ProductCreateRequestType) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }
};