import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { ScrollTop } from "primereact/scrolltop";



const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <Outlet />
      <ScrollTop
        icon="pi pi-arrow-up text-white"
        className="bg-yellow-500 text-black hover:bg-yellow-600 transition-colors duration-300"
        style={{
          backgroundColor: "#facc15",
        }}
      />
      <Footer />
    </div>
  );
};

export default Layout;
