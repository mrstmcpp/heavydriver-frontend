import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
const Layout = () => {
  return (
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <div className="content-area">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
