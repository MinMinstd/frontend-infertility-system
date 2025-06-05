import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { userRoutes } from "./router/userRouter";
import { adminRoutes } from "./router/adminRouter";
import { MainLayout } from "./layouts/MainLayout";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          {userRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.handle?.layout === "none" ? (
                  route.element
                ) : (
                  <MainLayout>{route.element}</MainLayout>
                )
              }
            />
          ))}

          {/* Admin Routes */}
          {adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            >
              {route.children && route.children.map((child, idx) => (
                <Route
                  key={child.path || idx}
                  index={child.index}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
