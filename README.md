# 🖥️ MaintenanceChronicleUi

**MaintenanceChronicleUi** is the frontend application for the Maintenance Chronicle platform. Built with **Angular 19**, it interfaces with the [`MaintenanceChronicleApi`](https://github.com/your-username/maintenanceChronicleApi) to provide a clean and modern UI for maintenance tracking, task workflows, user management, and more.

---

## 🧰 Tech Stack

- **Angular 19**
- **RxJS** & **Angular Router**
- **SCSS Modules**
- **HTTP Interceptors & JWT Authentication**
- **Form Handling with Reactive Forms**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/NicoSoftEngineer/MaintenanceChronicleUi.git
cd MaintenanceChronicleUi
```

### 2. Install Dependencies

```bash
npm install
```

---

## 3. Run the App Locally🏃‍♂️

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser.

The app is configured to work with the backend API at `https://localhost:5209/api` by default.

---

## 🔐 Authentication

This frontend app uses JWT-based authentication:

- Tokens are stored in `localStorage`
- Authenticated requests automatically attach the token using an HTTP interceptor
- Guards are used to protect routes

---

## ✉️ Email Flow Integration

The frontend supports the following routes, used in email-based flows triggered by the backend:

- **Email Confirmation:** `/auth/email-confirm/:email/:token`
- **Password Reset:** `/auth/password-reset/:email/:token`
- **Create Password:** `/auth/create-password/:email/:confirmationToken/:passwordToken`

Make sure these match the API-side `EnvironmentOptions` settings.

---

## 📦 Production Build

```bash
ng build
```

Output will be in the `dist/` folder, ready to be hosted or served behind a web server or CDN.

---

## 🧪 Testing

Run unit tests with:

```bash
ng test
```

---

## 📚 Documentation

Frontend architecture and usage documentation coming soon. For now, refer to:

- Angular Docs: [MaintenanceChronicleUI Compodoc](https://nicosoftengineer.github.io/MaintenanceChronicleUi/)
- Backend Docs: [MaintenanceChronicleApi DocFX](https://nicosoftengineer.github.io/MaintenanceChronicleApi/index.html)
