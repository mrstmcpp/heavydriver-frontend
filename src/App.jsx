import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Layout from "./layout/Layout";
import "./App.css";
import "primereact/resources/themes/viva-dark/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
