# Stage 1: Build Angular app
FROM node:18 as build
WORKDIR /MaintenanceChronicleUi
COPY MaintenanceChronicleUi/ ./
RUN npm install
RUN npm run build --prod

# Stage 2: Serve with NGINX
FROM nginx:alpine
COPY --from=build /MaintenanceChronicleUi/dist/maintenance-chronicle-ui/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
