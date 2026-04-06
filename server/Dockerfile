#Lấy image nền là Node.js 20 bản Alpine. 
#Alpine rất nhẹ, nên image cuối nhỏ hơn và khởi động nhanh hơn.
FROM node:20-alpine

#Đặt thư mục làm việc bên trong container là /app.
#Từ đây trở đi, mọi lệnh copy, install, chạy app sẽ diễn ra trong thư mục này.
WORKDIR /app

#Chỉ copy file khai báo dependency trước.
#Cách này giúp Docker tận dụng cache tốt hơn: 
#nếu source code đổi nhưng package.json không đổi thì bước cài dependency có thể không phải chạy lại.
COPY package*.json ./

#Cài các dependency production thôi, không cài devDependencies.
#npm ci phù hợp cho môi trường build/container vì cài đúng theo lockfile, ổn định hơn npm install.
RUN npm ci --omit=dev

#Copy toàn bộ source backend vào container.
#Sau bước này container đã có code ứng dụng để chạy.
COPY . .

#Đặt môi trường chạy là production.
ENV NODE_ENV=production
#Thông báo container sẽ lắng nghe ở port 5000.
EXPOSE 5000

#Lệnh mặc định khi container khởi động.
#Docker sẽ chạy app bằng node index.js.
CMD ["node", "index.js"]