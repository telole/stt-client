import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LandingPage from './pages/LandingPage';
import "animate.css";
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NewsPage from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Dosen from './pages/Dosen';
import Curriculums from './pages/Curriculums';
import Akreditasi from './pages/Akreditasi';
import AnnoucementSchedule from './pages/AnnoucementSchedule';
import Fallback from './pages/Fallback';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100,
    });
  }, []);

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/berita' element={<NewsPage/>} />
      <Route path='/berita/:slug' element={<NewsDetail/>} />
      <Route path='/dosens' element={<Dosen/>} />
      <Route path='/kurikulum' element={<Curriculums/>} />
      <Route path='/akreditasi' element={<Akreditasi/>} />
      <Route path='/pengumuman-jadwal-kegiatan' element={<AnnoucementSchedule/>} />
      <Route path='*' element={<Fallback/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
