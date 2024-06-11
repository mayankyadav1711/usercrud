import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import toast, { Toaster } from 'react-hot-toast';
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{ zIndex: '9999999999' }} // Ensure the container has a high z-index
  toastOptions={{
    className: '',
    duration: 5000,
    style: {
      background: 'white',
      color: 'black',
      fontSize: '16px',
    },
    success: {
      duration: 3000,
     
    },
  }}
/>
    </Router>
  );
}

export default App;
