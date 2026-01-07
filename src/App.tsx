import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import "animate.css";
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import News from './pages/frc/News';
import NewsPage from './pages/News';
import Dosen from './pages/Dosen';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/berita' element={<NewsPage/>} />
      <Route path='/dosens' element={<Dosen/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
