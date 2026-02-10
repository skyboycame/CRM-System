
import { Route, Routes } from "react-router";
import TodosPage from "./pages/TodosPage/TodosPage";
import MainLayout from "./components/MainLayout/MainLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";



function App() {
 

  return (
   <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<TodosPage />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
