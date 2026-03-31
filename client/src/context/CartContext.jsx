import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Lấy dữ liệu giỏ hàng từ LocalStorage lúc khởi tạo
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Lưu vào LocalStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  // Thêm vào giỏ hàng
  const addToCart = (product, qty = 1, size = 'Default') => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item._id === product._id && item.size === size
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, qty: item.qty + qty }
            : item
        );
      } else {
        return [...prevCart, { ...product, qty, size }];
      }
    });
  };

  // Xoá sản phẩm khỏi giỏ
  const removeFromCart = (id, size) => {
    setCart((prevCart) => prevCart.filter((item) => !(item._id === id && item.size === size)));
  };

  // Cập nhật số lượng
  const updateQuantity = (id, size, qty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id && item.size === size ? { ...item, qty: Number(qty) } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.qty, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
