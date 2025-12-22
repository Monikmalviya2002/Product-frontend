import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login.jsx";
import Otp from "./component/Otp.jsx";
import Dashboard from "./component/Dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/otp" element={<Otp/>} />
         <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
