// API Configuration - Support both development and production
// In development: use VITE_API_URL env var (default localhost:5000)
// In production Docker: use relative path /api (Nginx reverse proxy to server:5000)
// In production remote: use absolute URL to backend domain

const isDev = import.meta.env.DEV;
const API_BASE_URL = isDev
  ? import.meta.env.VITE_API_URL || "http://localhost:5000"
  : ""; // Production: empty string means relative path (/api/...)

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,

  // Products
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCT_DETAIL: (id) => `${API_BASE_URL}/api/products/${id}`,
  PRODUCTS_BY_BRAND: (brandId) =>
    `${API_BASE_URL}/api/products/brand/${brandId}`,
  PRODUCTS_BY_CATEGORY: (categoryId) =>
    `${API_BASE_URL}/api/products/category/${categoryId}`,

  // Categories
  CATEGORIES: `${API_BASE_URL}/api/categories`,

  // Brands
  BRANDS: `${API_BASE_URL}/api/brands`,

  // Admin
  ADMIN_DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
};

export default API_BASE_URL;
