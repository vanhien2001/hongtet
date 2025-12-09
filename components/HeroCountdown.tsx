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

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 md:mx-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[120px] shadow-2xl border border-white/20">
        <span className="block text-4xl md:text-6xl font-bold font-serif text-tetGold tabular-nums leading-none mb-2">
          {value < 10 ? `0${value}` : value}
        </span>
      </div>
      <span className="text-xs md:text-sm uppercase tracking-widest mt-3 text-white/80 font-medium">{label}</span>
    </div>
  );

  return (
    <div className="relative w-full py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden bg-tetRed rounded-b-[3rem] shadow-xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #F8D849 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-tetGold/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-tetGold/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center px-4">
        <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-xs md:text-sm font-bold text-white uppercase tracking-wider mb-6 border border-white/30">
          Sự kiện sắp tới
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-md">
          Tết Nguyên Đán 2026
        </h1>
        <p className="text-white/80 text-lg mb-12 italic font-serif">"Về nhà ăn Tết, gia đình sum vầy"</p>
        
        <div className="flex flex-wrap justify-center items-end">
          <TimeUnit value={timeLeft.days} label="Ngày" />
          <TimeUnit value={timeLeft.hours} label="Giờ" />
          <TimeUnit value={timeLeft.minutes} label="Phút" />
          <TimeUnit value={timeLeft.seconds} label="Giây" />
        </div>
      </div>
    </div>
  );
};

export default HeroCountdown;