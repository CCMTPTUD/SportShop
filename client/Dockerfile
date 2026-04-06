#Tạo stage build với Node.js 20 bản Alpine.
FROM node:20-alpine AS build

#Đặt thư mục làm việc trong container là /app.
WORKDIR /app

#Copy file khai báo dependency trước để tận dụng cache Docker.
COPY package*.json ./

#Cài toàn bộ dependency cần cho quá trình build frontend.
RUN npm install

#Copy toàn bộ mã nguồn client vào container build.
COPY . .

#Chạy build production của Vite.
RUN npm run build

#Bắt đầu stage runtime mới bằng Nginx nhẹ.
#Stage này không còn Node nữa, chỉ cần web server để phục vụ file tĩnh.
FROM nginx:1.27-alpine

#Gắn cấu hình Nginx riêng của project.
COPY nginx.conf /etc/nginx/conf.d/default.conf

#Lấy thư mục dist từ stage build và copy sang thư mục web root của Nginx.
COPY --from=build /app/dist /usr/share/nginx/html

#Cho biết container sẽ lắng nghe cổng 80.
EXPOSE 80

#Khởi động Nginx ở chế độ chạy foreground để container không thoát.
CMD ["nginx", "-g", "daemon off;"]