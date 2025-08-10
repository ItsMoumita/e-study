import React from 'react';

const Error = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center  bg-gradient-to-l from-[#002147]  to-gray-900/80 text-center px-4">
            <img
                src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?semt=ais_hybrid&w=740"
                alt="404 Error - Broken Robot"
                className="max-w-xs md:max-w-md w-full mb-6 rounded shadow-lg"
                style={{objectFit: 'contain'}}
            />
            <h1 className="text-5xl font-extrabold text-[#f0f4ff] mb-2">404</h1>
            <h2 className="text-2xl font-bold text-[#f0f4ff] mb-2">Page Not Found</h2>
            <p className="text-[#f0f4ff] mb-6">Sorry, the page you are looking for does not exist or has been moved.</p>
            <a href="/" className="inline-block bg-[#f0f4ff] text-[#002147] px-6 py-2 rounded hover:bg-[#f0f4ff] transition-colors font-semibold">Go Home</a>
        </div>
    );
};

export default Error;