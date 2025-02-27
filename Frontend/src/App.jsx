import Sidebar from "./components/Header";
import Signin from "./components/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Sidebar />} />
    <Route path="/signin" element={<Signin />} />
    </Routes>
      
    </BrowserRouter>
      
    </>
  );
}