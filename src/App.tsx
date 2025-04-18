// frontend/src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CampaignsPage from "./pages/CampaignsPage";
import LeadsPage from "./pages/LeadsPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="*" element={<LeadsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
