import "./App.css";
import Main from "./components/Main";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import NotFound from "./components/NotFound";
import UserDetailPage from "./components/users/UserDetailPage";
import { BrowserRouter, Routes, Route } from "react-router";
import DefaultLayout from "./components/layout/DefaultLayout";
import NoHeaderLayout from "./components/layout/NoHeaderLayout";
import UsersList from "./components/users/UsersList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Route>
        <Route element={<NoHeaderLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
