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
import client from "./apolloClient";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "./components/theme-provider";
import AuthLayout from "./components/layout/AuthLayout";
import MyProfilePage from "./components/users/MyProfilePage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Main />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/:id" element={<UserDetailPage />} />
              <Route path="/me" element={<MyProfilePage />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Route>
            <Route element={<NoHeaderLayout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
