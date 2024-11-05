import OffcanvasExample from "./Components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de que Bootstrap esté importado
import { Route, Routes } from "react-router-dom";
import PhotoAlbum from "./Pages/PhotoAlbum/PhotoAlbum";
import LoginPage from "./Pages/LoginPage/LoginPage";
import "./app.css";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { Toaster } from "react-hot-toast";
import ClusterPage from "./Pages/ClusterPage/ClusterPage";

export function App() {
  return (
    <div className="application">
      <OffcanvasExample />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/folder/:hash" element={<PhotoAlbum />} />
        <Route path="/home" element={<PhotoAlbum />} />
        <Route path="/album" element={<PhotoAlbum />} />
        <Route path="/shared" element={<PhotoAlbum />} />
        <Route path="/cluster" element={<ClusterPage/>} />
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          // duration: 1500,
          style: {
            background: "#363636",
            color: "#fff",
          },

          success: {
            duration: 3000,
          },
        }}
      />
    </div>
  );
}

export default App;
