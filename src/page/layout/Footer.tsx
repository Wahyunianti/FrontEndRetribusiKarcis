import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-screen absolute bottom-0 right-0 left-0 z-5">
            <svg className='w-400 sm:w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor:"#b9d48a",stopOpacity:1}} /><stop offset="100%" style={{stopColor:"#ecfcca",stopOpacity:1}} /></linearGradient></defs><path fill="url(#gradient)" fillOpacity="1" d="M0,96L48,122.7C96,149,192,203,288,213.3C384,224,480,192,576,197.3C672,203,768,245,864,266.7C960,288,1056,288,1152,282.7C1248,277,1344,267,1392,261.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </footer>
    );
};

export default Footer;