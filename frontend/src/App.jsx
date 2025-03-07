import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Notfound from "./components/Notfound";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Cookies from 'js-cookie';
import {useState, useEffect} from "react";
import ContainerSeaBattle from "./components/ContainerSeaBattle";
import ContainerBestPlayers from "./components/ContainerBestPlayers";
import ContainerStats from "./components/ContainerStats";


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


    const [isModalOpen, setIsModalOpen] = useState(true);

    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <Routes>

                <Route path="/" element={
                    <ContainerSeaBattle
                        loading={loading}
                        isAuthenticated={isAuthenticated}
                        isGuest={isGuest}
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                    />
                }/>

                <Route path="/bestPlayers" element={
                    <ContainerBestPlayers
                        loading={loading}
                        isAuthenticated={isAuthenticated}
                        isGuest={isGuest}
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                    />
                }/>


                <Route path="/myStats" element={
                    <ContainerStats
                        loading={loading}
                        isAuthenticated={isAuthenticated}
                        isGuest={isGuest}
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                    />
                }/>

                <Route path="/signin" element={<Signin/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="*" element={<Notfound/>}/>
            </Routes>
        </>
    );
}