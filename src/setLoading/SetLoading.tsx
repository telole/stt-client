import React from 'react';

const LoadingSpinner = () => {
  return (
    <>
      <div className="loading-container">
        <img src="/sttp.png" alt="STTP Logo" className="logo-center" />
        
        <div className="orbit">
          <div className="planet blue"></div>
          <div className="planet yellow"></div>
        </div>

        <div className="loading-text">Loading...</div>
      </div>

      <style>{`
        .loading-container {
          position: relative;
          width: 150px;
          height: 150px;
          margin: 100px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logo-center {
          width: 100px;
          height: 100px;
          z-index: 2;
        }

        .orbit {
          position: absolute;
          top: 25px;
          left: 25px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          animation: orbit 3s linear infinite;
        }

        .planet {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        .planet.blue {
          background-color: #00bfff;
        }

        .planet.yellow {
          background-color: #ffd700;
          top: auto;
          bottom: 0;
        }

        .loading-text {
          margin-top: 16px;
          font-size: 16px;
          color: #444;
          font-weight: 500;
        }

        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default LoadingSpinner;
