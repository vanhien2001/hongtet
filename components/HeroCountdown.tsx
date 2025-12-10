import React, { useState, useEffect } from 'react';
import { TET_DATE } from '../constants';

const HeroCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(TET_DATE) - +new Date();
      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = () => {
    const tetQASection = document.getElementById('tet-qa-section');
    if (tetQASection) {
      tetQASection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-3 md:mx-4">
      <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-3xl p-5 md:p-8 min-w-[90px] md:min-w-[140px] shadow-2xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-3xl"></div>
        <span className="relative block text-5xl md:text-7xl font-bold font-serif text-yellow-200 tabular-nums leading-none drop-shadow-[0_2px_8px_rgba(252,211,77,0.3)]">
          {value < 10 ? `0${value}` : value}
        </span>
      </div>
      <span className="text-sm md:text-base uppercase tracking-[0.2em] mt-4 text-white font-semibold drop-shadow-lg">{label}</span>
    </div>
  );

  return (
    <div className="relative w-full py-24 md:py-36 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-b-[3rem] shadow-2xl">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #FDE047 1.5px, transparent 0)', backgroundSize: '50px 50px' }}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-yellow-500/5 to-transparent rounded-full blur-2xl"></div>

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 backdrop-blur-md rounded-full px-6 py-2 text-sm md:text-base font-bold text-yellow-50 uppercase tracking-wider mb-8 border-2 border-yellow-300/40 shadow-xl">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>Sắp tết rồi</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-3 drop-shadow-2xl tracking-tight">
          Tết Nguyên Đán 2026
        </h1>
        <div className="inline-block bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent">
          <p className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">Năm Bính Ngọ</p>
        </div>
        <p className="text-white/90 text-xl md:text-2xl mb-12 italic font-serif drop-shadow-md">"Về nhà ăn Tết, gia đình sum vầy"</p>
        
        <div className="flex flex-wrap justify-center items-end gap-1 md:gap-2 mb-10">
          <TimeUnit value={timeLeft.days} label="Ngày" />
          <TimeUnit value={timeLeft.hours} label="Giờ" />
          <TimeUnit value={timeLeft.minutes} label="Phút" />
          <TimeUnit value={timeLeft.seconds} label="Giây" />
        </div>
        
        <button 
          onClick={scrollToSection}
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-red-800 font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 border-2 border-yellow-300"
        >
          <span className="text-lg">Chi tiết</span>
          <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroCountdown;