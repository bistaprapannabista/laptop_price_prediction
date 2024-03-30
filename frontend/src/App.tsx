import './App.css'
import HomePage from './pages/home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PredictPage from './pages/predict';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import ContactPage from './pages/contact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />

        <Route path="/predict" element={<PredictPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />


      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
