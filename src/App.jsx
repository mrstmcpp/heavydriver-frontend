import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Layout from "./layout/Layout";
import "./App.css";
import "primereact/resources/themes/viva-dark/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import About from "./pages/About";
import Contact from "./pages/Contact"; 
import Engineering from "./pages/Engineering"; 
import FAQ from "./pages/FAQ"; 
import NotFound from "./pages/404"; 
import BookRide from "./core/BookRide";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="engineering" element={<Engineering />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
        <Route path="book" element={<BookRide />} />
      </Route>
    </Routes>
  );
}

export default App;
