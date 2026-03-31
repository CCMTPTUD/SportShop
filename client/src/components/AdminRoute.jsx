import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("userRole");
  
  // Nếu không phải admin, chặn và chuyển hướng về trang chủ
  if (role !== "admin") {
    alert("Khu vực giới hạn. Bạn không có quyền truy cập!");
    return <Navigate to="/" replace />;
  }

  // Nếu là admin, cho phép render component con (các component trong /admin)
  return children;
};

export default AdminRoute;
