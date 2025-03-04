import Sidebar from "./components/Sidebar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Notfound from "./components/Notfound";
import BestPlayers from "./components/BestPlayers";
import SeaBattle from "./components/SeaBattle";
import { PermissionDenied } from "./components/PermissionDenied";
import { Stats } from "./components/Stats";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authenticatedpls } from './components/Authenticatedpls';
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticated = Cookies.get('authenticated');
    const guest = Cookies.get('guest');
    setIsGuest(guest === 'true');
    setIsAuthenticated(authenticated === 'true');
    setLoading(false);
  }, []);

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

  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div style={{ display: "flex" }}>
            {loading ? <></> : isAuthenticated ? (
              <>
              <Sidebar />
              <SeaBattle/>
              </>
            ) : (
              <>
                <Sidebar />
                {isGuest ? <></> : <Authenticatedpls isOpen={isModalOpen} onClose={closeModal} />}
              </>
            )}
          </div>} />
          <Route path="/bestPlayers" element={<div style={{ display: "flex" }}>
            <>
              {loading ? <></> : isAuthenticated ? (
                <>
                  <Sidebar />
                  <BestPlayers />
                </>
              ) : (
                <>
                  <Sidebar />
                  {isGuest ? <><PermissionDenied context={"Топ Лучших игроков"} /></> : <><Authenticatedpls isOpen={isModalOpen} onClose={closeModal} /><PermissionDenied context={"Топ Лучших игроков"} /></>}
                </>
              )}

            </>
          </div>} />
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
                  {isGuest ? <><PermissionDenied context={"своей Статистики"} /></> : <Authenticatedpls isOpen={isModalOpen} onClose={closeModal} />}
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