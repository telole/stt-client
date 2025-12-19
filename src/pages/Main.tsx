
import { api } from "../config/hooks";
import { useEffect, useState } from "react";
import 'animate.css';

interface Article { 
    id : number;
    documentid : string;
    title : string;
    description : string;
    slug : string;
    createdAt : string;
    updatedAt : string;
    publishedAt : string;
}

function Main() {
    const [data, setData] = useState<Article[]>([]);

    const axios = api()

    useEffect(() => {
        axios.get('articles').then((Res) => {
            setData(Res.data.data);
        }).catch((error) => {
            console.error("There was an error fetching the articles!", error);
        });
    }, []);
    return (
         <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg animate__animated animate__fadeInUp animate__delay-1s">
        <h1 className="text-4xl font-bold text-blue-600 mb-4 animate__animated animate__bounceIn">
          Hello, Tailwind CSS & Animate.css!
        </h1>
        <p className="text-lg text-gray-800 animate__animated animate__fadeIn">
          This is a simple test to verify if Tailwind CSS and Animate.css are working correctly in your React app.
        </p>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
          Test Button
        </button>
      </div>
    </div>
    );
}
export default Main;