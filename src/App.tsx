import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import "animate.css";
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
