import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { userRoutes } from "./router/userRouter";
import { MainLayout } from "./layouts/MainLayout";
import { doctorRoutes } from "./router/doctorRouter";
import { adminRoutes } from "./router/adminRouter";
import managerRouter from "./router/managerRouter";
import ProtedRouter from "./context/ProtedRouter";

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
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

            {/* Route doctor */}
            <Route element={<ProtedRouter allowedRoles={["Doctor"]} />}>
              {doctorRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element}>
                  {route.children &&
                    route.children.map((child) => (
                      <Route
                        key={child.path || "index"}
                        index={child.index}
                        path={child.path}
                        element={child.element}
                      />
                    ))}
                </Route>
              ))}
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtedRouter allowedRoles={["Admin"]} />}>
              {adminRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element}>
                  {route.children &&
                    route.children.map((child, idx) => (
                      <Route
                        key={child.path || idx}
                        index={child.index}
                        path={child.path}
                        element={child.element}
                      />
                    ))}
                </Route>
              ))}
            </Route>

            {/* Manager Routes */}
            <Route element={<ProtedRouter allowedRoles={["Manager"]} />}>
              {managerRouter.map((route) => (
                <Route key={route.path} path={route.path} element={route.element}>
                  {route.children &&
                    route.children.map((child) => (
                      <Route
                        key={child.path || "index"}
                        index={child.index}
                        path={child.path}
                        element={child.element}
                      />
                    ))}
                </Route>
              ))}
            </Route>

            {/* Route Unauthorized */}
            <Route
              path="/unauthorized"
              element={<div>Không có quyền truy cập</div>}
            />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}
