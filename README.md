# 🎯 Hệ thống Quản lý Điều trị Hiếm muộn - Frontend

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.25.4-blue.svg)](https://ant.design/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)

Ứng dụng frontend quản lý quy trình điều trị hiếm muộn, hỗ trợ bệnh nhân đặt lịch khám, theo dõi tiến trình điều trị và thanh toán. Hệ thống phục vụ 4 nhóm người dùng: Khách hàng, Bác sĩ, Quản lý và Admin.

> 🏥 **Hệ thống y tế chuyên nghiệp** - Ứng dụng frontend quản lý lịch khám và hồ sơ bệnh nhân điều trị hiếm muộn, phát triển bằng React + TypeScript + Ant Design + Tailwind CSS, tương tác với backend qua REST API.

---

## 🌐 Demo

🔗 `https://your-project-url.vercel.app` <!-- Chưa deploy -->

---

## ⚙️ Công nghệ sử dụng

### 🏗️ Core Framework

- ⚛️ **React 18.2.0** + **TypeScript 5.0.0** (strict mode)
- ⚡ **Vite 6.3.5** - Build tool & dev server
- 📦 **ES2020** target với **ESNext** modules

### 🎨 UI/UX Libraries

- 🎨 **Ant Design 5.25.4** - Component library chính
- 🌈 **TailwindCSS 3.4.17** - Utility-first CSS
- 🎭 **Framer Motion 12.23.3** - Animation library
- ✨ **GSAP 3.13.0** - Advanced animations
- 🎬 **Lottie React 2.4.1** - Lottie animations
- 🎯 **Material-UI 7.2.0** - Bổ sung components
- 🔥 **Emotion** - CSS-in-JS styling

### 🔄 State & Routing

- 🔁 **React Router DOM 7.6.2** - Client-side routing
- 🗂️ **React Context API** - State management
- 🔧 **Redux Toolkit 2.8.2** - Advanced state management
- 📋 **React Hook Form 7.56.4** - Form handling

### 📡 Data & API

- 📡 **Axios 1.9.0** - HTTP client
- 🔐 **Google OAuth 0.12.2** - Authentication
- ⏳ **Day.js** - Date manipulation
- 💳 **VNPay Integration** - Payment gateway

### 📊 Charts & Visualization

- 📊 **Chart.js 4.4.9** + **React-ChartJS-2 5.3.0**
- 📈 **Recharts 3.1.0** - React charts
- 📉 **Ant Design Plots 2.6.0** - Statistical charts

### 🛠️ Development Tools

- 🔍 **ESLint 9.25.0** - Code linting
- 🎯 **TypeScript ESLint 8.30.1** - TS linting
- 📦 **PostCSS 8.5.6** + **Autoprefixer 10.4.21**
- 🔧 **Vite Plugin React SWC 3.9.0** - Fast refresh
- 🎨 **Heroicons 2.2.0** + **Lucide React 0.511.0** - Icon libraries

---

## 📦 Cài đặt & chạy local

### 🔧 Yêu cầu hệ thống

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **Git**: Latest version

### 🚀 Hướng dẫn cài đặt

```bash
# 1. Clone repository
git clone https://github.com/your-username/frontend-infertility-system.git
cd frontend-infertility-system

# 2. Cài đặt dependencies
npm install

# 3. Tạo file environment (nếu cần)
cp .env.example .env.local

# 4. Chạy development server
npm run dev
```

### 📜 Available Scripts

```bash
# Development
npm run dev          # Chạy dev server với auto-open browser

# Production
npm run build        # Build cho production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Chạy ESLint kiểm tra code
```

### 🌍 Environment Variables

```env
# API Configuration
VITE_API_BASE_URL=https://localhost:7065/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_VNPAY_TMN_CODE=your_vnpay_tmn_code
```

---

## 📁 Cấu trúc thư mục

```text
frontend-infertility-system/
├── 📁 public/                    # Static assets
│   ├── 🖼️ Images/               # Hình ảnh tĩnh
│   │   ├── Banner.jpg
│   │   ├── doctors/             # Avatar bác sĩ
│   │   ├── Mission/             # Hình ảnh sứ mệnh
│   │   └── logo.png
│   └── vite.svg
├── 📁 src/
│   ├── 📁 assets/               # Tài nguyên React
│   │   └── react.svg
│   ├── 📁 components/           # 🔧 19 Components tái sử dụng
│   │   ├── Banner.tsx           # Hero banner
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Footer.tsx           # Site footer
│   │   ├── DoctorCard.tsx       # Card hiển thị bác sĩ
│   │   ├── ServiceCard.tsx      # Card dịch vụ
│   │   ├── LoginButton.tsx      # Nút đăng nhập
│   │   ├── Notification.tsx     # Thông báo
│   │   ├── Search.tsx           # Tìm kiếm
│   │   └── ... (11 components khác)
│   ├── 📁 context/              # 🔄 React Context
│   │   ├── AuthContext.tsx      # Quản lý authentication
│   │   ├── NotificationContext.tsx # Quản lý thông báo
│   │   └── ProtedRouter.tsx     # Route protection
│   ├── 📁 data/                 # 📊 Mock data & constants
│   │   ├── ServiceInformation.tsx
│   │   ├── feedbackData.ts
│   │   ├── newsItems.tsx
│   │   └── sampleStoriesData.tsx
│   ├── 📁 layouts/              # 🏗️ Layout components
│   │   ├── MainLayout.tsx       # Layout chính
│   │   ├── DoctorLayout.tsx     # Layout bác sĩ
│   │   ├── AdminLayout.tsx      # Layout admin
│   │   └── ManagerLayout.tsx    # Layout quản lý
│   ├── 📁 pages/                # 📄 Pages theo role
│   │   ├── 📁 admin/            # 👨‍💼 7 trang admin
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CustomerList.tsx
│   │   │   ├── DoctorWorkList.tsx
│   │   │   └── ...
│   │   ├── 📁 auth/             # 🔐 3 trang xác thực
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── ConfirmEmail.tsx
│   │   ├── 📁 customer/         # 👥 16 trang khách hàng
│   │   │   ├── Home.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Appointmenform.tsx
│   │   │   ├── PaymentPage.tsx
│   │   │   └── ...
│   │   ├── 📁 doctor/           # 👨‍⚕️ 12 trang bác sĩ
│   │   │   ├── Dashboard.tsx
│   │   │   ├── AppointmentPage.tsx
│   │   │   ├── Patient.tsx
│   │   │   └── ...
│   │   └── 📁 manager/          # 📊 10 trang quản lý
│   │       ├── ManagerDashboard.tsx
│   │       ├── ManagerServices.tsx
│   │       ├── ManagerFinance.tsx
│   │       └── ...
│   ├── 📁 router/               # 🛣️ Routing configuration
│   │   ├── userRouter.tsx       # Routes khách hàng
│   │   ├── doctorRouter.tsx     # Routes bác sĩ
│   │   ├── adminRouter.tsx      # Routes admin
│   │   └── managerRouter.tsx    # Routes quản lý
│   ├── 📁 servers/              # 🌐 API clients
│   │   ├── axiosClient.tsx      # Axios configuration
│   │   ├── auth.api.tsx         # Authentication APIs
│   │   ├── user.api.tsx         # User management APIs
│   │   ├── doctor.api.ts        # Doctor APIs
│   │   ├── manager.api.tsx      # Manager APIs
│   │   ├── booking.api.ts       # Booking APIs
│   │   └── service.api.ts       # Service APIs
│   ├── 📁 types/                # 📝 TypeScript definitions
│   │   ├── auth.d.tsx           # Auth types
│   │   ├── user.d.tsx           # User types
│   │   ├── doctor.d.ts          # Doctor types
│   │   ├── manager.d.tsx        # Manager types
│   │   ├── booking.d.ts         # Booking types
│   │   ├── service.d.ts         # Service types
│   │   ├── medicalRecord.d.tsx  # Medical record types
│   │   └── doctorSchedule.d.ts  # Schedule types
│   ├── App.tsx                  # 🚀 Main App component
│   ├── main.tsx                 # 🎯 Entry point
│   ├── index.css                # 🎨 Global styles + Tailwind
│   └── vite-env.d.ts           # 🔧 Vite type definitions
├── 📄 Configuration files
│   ├── package.json             # Dependencies & scripts
│   ├── vite.config.ts          # Vite configuration
│   ├── tailwind.config.js      # Tailwind configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── tsconfig.app.json       # App-specific TS config
│   ├── tsconfig.node.json      # Node-specific TS config
│   ├── eslint.config.js        # ESLint configuration
│   ├── postcss.config.js       # PostCSS configuration
│   └── .gitignore              # Git ignore rules
└── README.md                    # 📖 Project documentation
```

---

## 💡 Tính năng chính

### 👥 Khách hàng (Customer)

- ✅ Đăng nhập / Đăng xuất (Google OAuth)
- 📅 Đặt lịch hẹn với bác sĩ
- 🩺 Xem quá trình điều trị và kết quả
- 📋 Quản lý hồ sơ y tế
- 💳 Thanh toán VNPay
- ⭐ Đánh giá dịch vụ

### 👨‍⚕️ Bác sĩ (Doctor)

- 📊 Dashboard thống kê
- 👥 Quản lý lịch hẹn và bệnh nhân
- 📝 Tạo/cập nhật hồ sơ y tế
- 🧬 Quản lý phôi (embryo)
- 📅 Quản lý lịch làm việc

### 👔 Quản lý (Manager)

- 📈 Dashboard tổng quan
- 🛠️ Quản lý dịch vụ và lộ trình điều trị
- 💰 Báo cáo tài chính
- 💬 Quản lý feedback
- 👨‍⚕️ Quản lý lịch bác sĩ

---

## 🔐 Hệ thống phân quyền

### 🛡️ Role-based Access Control (RBAC)

| Role            | Quyền truy cập                              | Trang chính   |
| --------------- | ------------------------------------------- | ------------- |
| 👥 **Customer** | Đặt lịch, xem hồ sơ y tế, thanh toán        | `/customer/*` |
| 👨‍⚕️ **Doctor**   | Quản lý bệnh nhân, lịch hẹn, hồ sơ điều trị | `/doctor/*`   |
| 📊 **Manager**  | Quản lý dịch vụ, tài chính, báo cáo         | `/manager/*`  |

### 🔒 Authentication Flow

1. **Google OAuth 2.0** - Đăng nhập qua Google
2. **JWT Token** - Lưu trữ session
3. **Protected Routes** - Kiểm tra quyền truy cập
4. **Context API** - Quản lý trạng thái auth

### 🛣️ Route Protection

```typescript
// ProtectedRouter.tsx
<ProtectedRoute allowedRoles={["doctor", "manager"]}>
  <DoctorDashboard />
</ProtectedRoute>
```

---

## 🌐 API Integration

### 🔗 Backend Connection

- **Base URL**: `https://localhost:7065/api`
- **Authentication**: Bearer Token (JWT)
- **HTTP Client**: Axios với interceptors
- **Error Handling**: Centralized error management

### 📡 API Modules

| Module         | File              | Chức năng                            |
| -------------- | ----------------- | ------------------------------------ |
| 🔐 **Auth**    | `auth.api.tsx`    | Login, Register, Token refresh       |
| 👤 **User**    | `user.api.tsx`    | Profile, Account management          |
| 👨‍⚕️ **Doctor**  | `doctor.api.ts`   | Doctor schedules, Patient management |
| 📊 **Manager** | `manager.api.tsx` | Services, Finance, Reports           |
| 📅 **Booking** | `booking.api.ts`  | Appointments, Scheduling             |
| 🛍️ **Service** | `service.api.ts`  | Treatment services, Pricing          |

### 🔧 Axios Configuration

```typescript
// axiosClient.tsx
const axiosClient = axios.create({
  baseURL: "https://localhost:7065/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 💳 Payment Integration

- **VNPay Gateway** - Thanh toán trực tuyến
- **Payment Flow**: Cart → VNPay → Callback → Confirmation
- **Security**: Hash validation, Transaction verification

---

## 🧑‍💻 Đóng góp

### 🤝 Quy trình đóng góp

1. **Fork** dự án về GitHub của bạn
2. **Clone** repository về máy local
   ```bash
   git clone https://github.com/your-username/frontend-infertility-system.git
   ```
3. **Tạo nhánh mới** cho tính năng
   ```bash
   git checkout -b feature/ten-tinh-nang-moi
   ```
4. **Commit** thay đổi với message rõ ràng
   ```bash
   git commit -m "feat: thêm tính năng đặt lịch hẹn"
   ```
5. **Push** lên nhánh của bạn
   ```bash
   git push origin feature/ten-tinh-nang-moi
   ```
6. **Tạo Pull Request** với mô tả chi tiết

### 📋 Coding Standards

- ✅ **TypeScript strict mode** - Không sử dụng `any`
- ✅ **Functional Components** + Hooks
- ✅ **Named exports** cho components tái sử dụng
- ✅ **ESLint** - Code linting
- ✅ **Prettier** - Code formatting
- ✅ **Conventional Commits** - Commit message format

### 🐛 Bug Reports

Khi báo cáo lỗi, vui lòng bao gồm:

- 📝 Mô tả chi tiết lỗi
- 🔄 Các bước tái tạo lỗi
- 🖥️ Môi trường (Browser, OS)
- 📸 Screenshots (nếu có)

### 💡 Feature Requests

Đề xuất tính năng mới:

- 🎯 Mô tả rõ ràng tính năng
- 🤔 Lý do cần thiết
- 📋 Acceptance criteria
- 🎨 Mockup/wireframe (nếu có)

---

### 🌐 Production Build

```bash
# Build cho production
npm run build

# Preview production build
npm run preview
```

### 📦 Build Output

```text
dist/
├── assets/          # Optimized assets
├── index.html       # Entry HTML
└── vite.svg         # Vite logo
```

### ☁️ Deployment Platforms

- **Vercel** - Recommended
- **Netlify** - Alternative
- **GitHub Pages** - Free option

### ⚡ Optimization Features

- 🔄 **Code Splitting** - Dynamic imports
- 📦 **Tree Shaking** - Remove unused code
- 🗜️ **Asset Optimization** - Image compression
- 💾 **Caching** - Browser & service worker caching
- ⚡ **SWC** - Fast compilation with Vite

## 📞 Liên hệ & Hỗ trợ

### 📧 Contact Information

- **Email**: support@thienthanhnho.com
- **Website**: https://thienthanhnho.com
- **GitHub**: [Repository Issues](https://github.com/your-username/frontend-infertility-system/issues)

### 🆘 Support Channels

- 🐛 **Bug Reports**: GitHub Issues
- 💡 **Feature Requests**: GitHub Discussions
- 📚 **Documentation**: Wiki
- 💬 **Community**: Discord/Slack

### 🕐 Response Time

- 🔴 **Critical bugs**: 24 hours
- 🟡 **General issues**: 2-3 days
- 🟢 **Feature requests**: 1 week

---

## 🏆 Contributors

Cảm ơn tất cả những người đã đóng góp cho dự án!

<!-- Contributors will be automatically added here -->

---

## ⭐ Star History

Nếu dự án hữu ích, hãy cho chúng tôi một ⭐ trên GitHub!

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/frontend-infertility-system&type=Date)](https://star-history.com/#your-username/frontend-infertility-system&Date)
