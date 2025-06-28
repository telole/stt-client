import React, { useState } from 'react';
import Navbar from './composable/Navbar';
import Header from './frc/header';
import Flow from './frc/Flow';
import LoadingSpinner from '../setLoading/SetLoading';
import Selayang from './frc/Selayang';
import Prodi from './frc/Prodi';
import Program from './frc/Program';
import Reason from './frc/Reason';
import Testimoni from './frc/Testimoni';
import { NewLineKind } from 'typescript';
import News from './frc/News';
import Profile from './frc/Profile';
import Footer from './composable/Footer';

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

return (
  <>
    <Navbar />
    <Header setLoading={setIsLoading} />
    <Flow setLoading={setIsLoading} />
    <Selayang setLoading={setIsLoading} />
    <Prodi setLoading={setIsLoading} />
    <Program setLoading={setIsLoading} />
    <Reason setLoading={setIsLoading} />
    <Testimoni setLoading={setIsLoading} />
    <News setLoading={setIsLoading} />
    <Profile  setLoading={setIsLoading} />
    <Footer setLoading={setIsLoading} />

    {/* Conditional loading spinner */}
 
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
