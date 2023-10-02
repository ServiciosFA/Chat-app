import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signin from "./pages/SigningPage";
import Chat from "./pages/ChatPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./ui/NavBar";
import "./App.scss";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./store/authSlice";
import { useEffect } from "react";
import Notification from "./ui/Notification";

function App() {
  const logSelector = useSelector(selectIsLoggedIn);
  const ProtectedRoute = ({ children }) => {
    if (!logSelector) return <Navigate to="/login" />;
    else return children;
  };

  useEffect(() => {}, [logSelector]);

  return (
    <Router>
      <Notification></Notification>
      <div className="mainContainer">
        <NavBar></NavBar>
        <div className="layout">
          <Routes>
            <Route path="/"></Route>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home></Home>
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/signin" element={<Signin></Signin>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat></Chat>
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
