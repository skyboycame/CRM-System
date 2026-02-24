import { Route, Routes } from "react-router-dom";
import TodosPage from "./pages/TodosPage/TodosPage";
import MainLayout from "./components/MainLayout/MainLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotAuthLayout from "./components/NotAuthLayout/NotAuthLayout";

function App() {

  return (
    <Routes>
      <Route element={<NotAuthLayout/>}>
        <Route path="/register" element={<RegistrationPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Route>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TodosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
