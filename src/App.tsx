import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import "animate.css";
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NewsPage from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Dosen from './pages/Dosen';
import Curriculums from './pages/Curriculums';
import Fallback from './pages/Fallback';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/berita' element={<NewsPage/>} />
      <Route path='/berita/:slug' element={<NewsDetail/>} />
      <Route path='/dosens' element={<Dosen/>} />
      <Route path='/kurikulum' element={<Curriculums/>} />
      <Route path='*' element={<Fallback/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
