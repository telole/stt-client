import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import "animate.css";
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import News from './pages/frc/News';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/berita' element={<News/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
