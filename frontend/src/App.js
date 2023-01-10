import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Link, Routes, Navigate } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/main/Login";
import Signup from "./components/main/Signup";
import Admin from "./components/admin";
import User from "./components/user";
import AdminProfile from "./components/admin/Profile";
import UserProfile from "./components/user/Profile";
import Home from "./components/main/Home";
import ManageUser from "./components/admin/ManageUser";
import AddNovel from "./components/user/AddNovel";
import Chat from "./components/user/Chat";
import ListNovel from "./components/main/ListNovel";
import NovelManager from "./components/user/NovelManager";
import ViewNovel from "./components/main/ViewNovel";
import CheckOut from "./components/user/CheckOut";
import UserAuth from "./UserAuth";
import AdminAuth from "./AdminAuth";
import ManageOrders from "./components/user/ManageOrders";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {

  const stripe = loadStripe(
    "pk_test_51MJCFESFzM9nsxSsupwtB39lFhJbHf7fPlbVVnyPezOli9SUNVnuDm5ixKKhGg5On2nfz3udpKaplEMd0D9canPU00aq5Zv6UH"
  );

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigate to="/main/home" />} path="/" />
          <Route element={<Main />} path="main">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="home" element={<Home />} />
            <Route path="browse" element={<ListNovel />} />
            <Route path="view/:id" element={<ViewNovel />} />
          </Route>

          <Route
            element={
              <AdminAuth>
                <Admin />
              </AdminAuth>
            }
            path="admin"
          >
            <Route path="pofile" element={<AdminProfile />} />
            <Route path="manageuser" element={<ManageUser />} />
          </Route>

          <Route
            element={
              <UserAuth>
                <User />
              </UserAuth>
            }
            path="user"
          >
            <Route path="pofile" element={<UserProfile />} />
            <Route path="addnovel" element={<AddNovel />} />
            <Route path="managenovel" element={<NovelManager />} />
            <Route path="manageorders" element={<ManageOrders />} />
            <Route path="checkout" element={
            <Elements stripe={stripe}>

            <CheckOut />} />
            </Elements>
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
