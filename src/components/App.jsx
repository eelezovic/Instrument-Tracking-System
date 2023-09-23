import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "./login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";
import InstrumentSetComponent from "../pages/InstrumentSetComponent";
import InstrumentsListPage from "../pages/InstrumentsListPage";
import InstrumentPage from "../pages/InstrumentPage";
import PrivateRoutes from "./PrivateRoutes";


function App() {
  const [isUserLoading, setIsUserLoading]= useState(true);
  const [user, setUser] = useState(null);

  const signin = ({currentUser}) => {
    setUser(currentUser);
    /*setUserName(name);*/
  };
  const signout = () => {
    setUser(false);
    /*setUserName("");*/
  };

  useEffect(() => {
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          setUser(data);
        }
        setIsUserLoading(false);
      })
      .catch((error) => {
        console.error("Error checking user authentication:", error);
      });
  }, []);

  if (isUserLoading) return "Loading..."

  return (
    <>
    <Navbar signout={signout} user={user} />
      <Routes>
        <Route path="/" element={<Login signin={signin} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoutes isSignedIn={user}>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoutes isSignedIn={user}>
              <About />
            </PrivateRoutes>
          }
        />
        <Route
          path="/instruments"
          element={
            <PrivateRoutes isSignedIn={user}>
              <InstrumentsListPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/instrument/:id"
          element={
            <PrivateRoutes isSignedIn={user} >
              <InstrumentPage user={user} />
            </PrivateRoutes>
          }
        />
        <Route
          path="/InstrumentSetComponent"
          element={
            <PrivateRoutes isSignedIn={user} >
              <InstrumentSetComponent user={user} />
            </PrivateRoutes>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;