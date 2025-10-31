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
        icon={<i className="pi pi-arrow-up text-black text-lg" />}
        className="!bg-yellow-500 hover:!bg-yellow-600 transition-colors duration-300"
      />
      <Footer />
    </div>
  );
};

export default Layout;
