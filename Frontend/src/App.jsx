import Sidebar from "./components/Sidebar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Notfound from "./components/Notfound";
import { Stats } from "./components/Stats";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authenticatedpls } from './components/Authenticatedpls';
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const authenticated = Cookies.get('authenticated');
    console.log(authenticated)
    setIsAuthenticated(authenticated === 'true');
    setLoading(false);
  }, []);
  console.log(isAuthenticated)
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   let timeoutId;//??? попробовать с куки

  //   const fetchSession = () => {
  //     fetch('/api/check-session')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.authenticated) {
  //           setUser(data.user);
  //         } else {
  //           setUser(null);
  //         }
  //         setLoading(false);
  //       })
  //   };
  //   timeoutId = setTimeout(fetchSession, 500);
  //   return () => clearTimeout(timeoutId);;

  // }, []);


  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>
            {loading ? <></> : isAuthenticated ? (
              <Sidebar />
            ) : (
              <>
                <Sidebar />
                <Authenticatedpls />
              </>
            )}
          </>} />
          <Route path="/bestPlayers" element={<Sidebar />} />
          <Route path="/myStats" element={<div style={{ display: "flex" }}>
            <>
            {loading ? <></> : isAuthenticated ? (
              <>
              <Sidebar />
              <Stats />
              </>
            ) : (
              <>
                <Sidebar />
              <Stats />
              <Authenticatedpls />
              </>
            )}
            
            </>
            
          </div>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Notfound />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}