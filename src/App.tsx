import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import "animate.css";
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import News from './pages/frc/News';
<<<<<<< HEAD
import NewsPage from './pages/News';
=======
>>>>>>> 4ca63424dd72f1e3cf3d75026baa04fc8b957f12
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
<<<<<<< HEAD
      <Route path='/berita' element={<NewsPage/>} />
=======
      <Route path='/berita' element={<News/>} />
>>>>>>> 4ca63424dd72f1e3cf3d75026baa04fc8b957f12
    </Routes>
    </BrowserRouter>
  );
}

export default App;
