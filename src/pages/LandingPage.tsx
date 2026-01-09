import React, { useState, useRef, useCallback, useEffect } from 'react';
import Navbar from './composable/Navbar';
import Header from './frc/header';
import Flow from './frc/Flow';
import LoadingSpinner from '../setLoading/SetLoading';
import Selayang from './frc/Selayang';
import Prodi from './frc/Prodi';
import Program from './frc/Program';
import Reason from './frc/Reason';
import Testimoni from './frc/Testimoni';
import News from './frc/News';
import Anno from './frc/Anno';
import Profile from './frc/Profile';
import Footer from './composable/Footer';
import KerjaSama from './frc/KerjaSama';
import Maps from './frc/Maps';

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loadingCountRef = useRef(0);

  const handleLoading = useCallback((loading: boolean) => {
    if (loading) {
      loadingCountRef.current += 1;
      setIsLoading(true);
    } else {
      loadingCountRef.current = Math.max(0, loadingCountRef.current - 1);
      setTimeout(() => {
        if (loadingCountRef.current === 0) {
          setIsLoading(false);
        }
      }, 50);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [isLoading]);

return (
  <>
    <Navbar />
    <Header setLoading={handleLoading} />
    <Flow setLoading={handleLoading} />
    <Selayang setLoading={handleLoading} />
    <Prodi setLoading={handleLoading} />
    <Program setLoading={handleLoading} />
    <Reason setLoading={handleLoading} />
    <Testimoni setLoading={handleLoading} />
    <News setLoading={handleLoading} />
    <Anno  />
    <Profile  setLoading={handleLoading} />
    <KerjaSama setLoading={handleLoading} />
    <Footer />
    {isLoading && (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )}

      <style>
        {`
          @font-face {
            font-family: 'Poppins';
            src: url('/poppins/Poppins-Regular.ttf') format('truetype');
            font-weight: 400;
            font-style: normal;
          }

          html {
            scroll-behavior: smooth;
          }

          @font-face {
            font-family: 'Poppins';
            src: url('/poppins/Poppins-Bold.ttf') format('truetype');
            font-weight: 700;
            font-style: normal;
          }

          html, body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins', sans-serif;
            box-sizing: border-box;
            height: 100%;
            overflow-x: hidden;
          }

          * {
            font-family: inherit;
            box-sizing: border-box;
          }

          .mobile-menu { display: none; }
          .mobile-menu.active { display: block; }

          .fade-in { animation: fadeIn 0.5s ease-in; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}
      </style>
    </>
  );
};

export default LandingPage;
